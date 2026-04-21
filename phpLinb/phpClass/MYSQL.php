<?php
/**
 * MySQL Database Wrapper Class
 * Updated for PHP 8.3 compatibility
 */
class MYSQL {
    // server host
    public string $host = "";
    // log in user
    public string $user = "";
    // password
    public string $pass = "";
    // target db name
    public string $dbname = "";

    // connect id (mysqli object or false)
    /** @var mysqli|false */
    public $link_id = false;
    
    // is in a transaction process
    public int $in_transaction = 0;

    /**
     * Connect and select database
     * 
     * @param string $host
     * @param string $user
     * @param string $pass
     * @param string $dbname
     * @throws LINB_E
     */
    public function connect(string $host, string $user, string $pass, string $dbname = ""): void {
        $this->link_id = mysqli_connect($host, $user, $pass, $dbname);
        
        // Check for connection error
        if (!$this->link_id) {
            throw new LINB_E("Cant connect to server: $host. Error: " . mysqli_connect_error());
        }

        if (function_exists("mysqli_set_charset")) {
            mysqli_set_charset($this->link_id, 'utf8');
        } else {
            mysqli_query($this->link_id, 'SET NAMES "utf8" COLLATE "utf8_general_ci"');
        }

        $this->host = $host;
        $this->user = $user;
        $this->pass = $pass;
        $this->dbname = $dbname;
    }

    /**
     * Close the connection
     * 
     * @throws LINB_E
     */
    public function close(): void {
        if ($this->link_id) {
            if (!mysqli_close($this->link_id)) {
                throw new LINB_E("Connection close failed.");
            }
            $this->link_id = false;
        }
    }

    /**
     * Select database
     * 
     * @param string $dbname
     * @throws LINB_E
     */
    public function selectdb(string $dbname): void {
        if (!mysqli_select_db($this->link_id, $dbname)) {
            throw new LINB_E("Cant open database: $dbname");
        }
        $this->dbname = $dbname;
    }

    /**
     * List all databases
     * 
     * @param bool $assoc
     * @return array
     */
    public function listdbs(bool $assoc = false): array {
        $i = mysqli_query($this->link_id, "show databases");
        $r = $this->_fetch_all($i, $assoc);
        $this->_release($i);
        return $r;
    }

    /**
     * List all tables
     * 
     * @param string $dbname
     * @param bool $assoc
     * @return mixed
     */
    public function listtables(string $dbname, bool $assoc = false): mixed {
        return $this->query("SHOW TABLES FROM " . $dbname, $assoc);
    }

    /**
     * Query any string
     * 
     * @param string $any
     * @param bool $assoc
     * @return mixed array [{},{},...] or TRUE/FALSE
     */
    public function query(string $any, bool $assoc = false): mixed {
        $i = $this->_query($any);
        if (is_bool($i)) {
            return $i;
        } else {
            $r = $this->_fetch_all($i, $assoc);
            $this->_release($i);
            return $r;
        }
    }

    /**
     * Select rows
     * 
     * @param string $table
     * @param string $fields
     * @param string $where
     * @param bool $all
     * @param bool $assoc
     * @return mixed
     */
    public function select(string $table, string $fields, string $where = '', bool $all = false, bool $assoc = false): mixed {
        $q = "SELECT " . $fields . ' FROM ' . $table . ($where !== '' ? ' WHERE ' . $where : '');
        $i = $this->_query($q);
        if ($all) {
            $r = $this->_fetch_all($i, $assoc);
        } else {
            $r = $this->_fetch_first($i, $assoc);
        }
        $this->_release($i);
        return $r;
    }

    /**
     * Update rows
     * 
     * @param string $table
     * @param array $fields
     * @param string $where
     * @return int affected rows
     */
    public function update(string $table, array $fields, string $where = ''): int {
        $q = "UPDATE " . $table . " SET ";
        foreach ($fields as $key => $val) {
            if ($val === null || strtolower((string)$val) == 'null') {
                $q .= "`$key` = NULL, ";
            } elseif (strtolower((string)$val) == 'now()') {
                $q .= "`$key` = NOW(), ";
            } else {
                $escaped = $this->link_id ? mysqli_real_escape_string($this->link_id, (string)$val) : addslashes((string)$val);
                $q .= "`$key`='" . $escaped . "', ";
            }
        }
        $qq = rtrim($q, ', ') . ($where !== '' ? ' WHERE ' . $where : '') . ';';
        $this->_query($qq);
        return mysqli_affected_rows($this->link_id);
    }

    /**
     * Insert row
     * 
     * @param string $table
     * @param array $fields
     * @return mixed inserted id
     */
    public function insert(string $table, array $fields): mixed {
        $q = "INSERT INTO " . $table . " ";
        $v = '';
        $n = '';
        foreach ($fields as $key => $val) {
            $n .= "`$key`, ";
            if ($val === null || strtolower((string)$val) == 'null') {
                $v .= "NULL, ";
            } elseif (strtolower((string)$val) == 'now()') {
                $v .= "NOW(), ";
            } else {
                $escaped = $this->link_id ? mysqli_real_escape_string($this->link_id, (string)$val) : addslashes((string)$val);
                $v .= "'" . $escaped . "', ";
            }
        }
        $q .= "(" . rtrim($n, ', ') . ") VALUES (" . rtrim($v, ', ') . ");";
        $this->_query($q);
        return mysqli_insert_id($this->link_id);
    }

    /**
     * Delete rows
     * 
     * @param string $table
     * @param string|null $where
     * @return int affected rows
     */
    public function delete(string $table, ?string $where = null): int {
        $q = "DELETE FROM `" . $table . '`' . ($where !== null ? ' WHERE ' . $where : '') . ';';
        $this->_query($q);
        return mysqli_affected_rows($this->link_id);
    }

    /**
     * Starts a transaction
     * 
     * @throws LINB_E
     */
    public function TransactionBegin(): void {
        if (!$this->in_transaction) {
            if (!mysqli_query($this->link_id, "START TRANSACTION")) {
                throw new LINB_E("Cant start TRANSACTION in this server: $this->host.");
            } else {
                $this->in_transaction = 1;
            }
        } else {
            throw new LINB_E("Already in transaction: $this->in_transaction.");
        }
    }

    /**
     * Ends the current transaction and commits
     * 
     * @throws LINB_E
     */
    public function TransactionEnd(): void {
        if ($this->in_transaction) {
            if (!mysqli_query($this->link_id, "COMMIT")) {
                throw new LINB_E("Cant commit a transaction: $this->in_transaction.");
            } else {
                $this->in_transaction = 0;
            }
        } else {
            throw new LINB_E("Not in a transaction");
        }
    }

    /**
     * Rolls the current transaction back
     * 
     * @throws LINB_E
     */
    public function TransactionRollback(): void {
        if (!mysqli_query($this->link_id, "ROLLBACK")) {
            throw new LINB_E("Could not rollback transaction: $this->in_transaction.");
        } else {
            $this->in_transaction = 0;
        }
    }

    /**
     * Executes SQL query
     * 
     * @param string $query_string
     * @return mysqli_result|bool
     * @throws LINB_E
     */
    protected function _query(string $query_string): mysqli_result|bool {
        if (!$this->link_id) {
            throw new LINB_E("Database not connected.");
        }
        $query_id = mysqli_query($this->link_id, $query_string);
        if (!$query_id) {
            throw new LINB_E("Query fail: $query_string. Error: " . mysqli_error($this->link_id));
        }
        return $query_id;
    }

    /**
     * Fetch one line result from the current query
     * 
     * @param mysqli_result $query_id
     * @param bool $assoc
     * @return array|null
     * @throws LINB_E
     */
    protected function _fetch($query_id, bool $assoc = false): ?array {
        if (!$query_id instanceof mysqli_result) {
            throw new LINB_E("Invalid query_id.");
        }
        
        if ($assoc) {
            $record = mysqli_fetch_assoc($query_id);
        } else {
            $record = mysqli_fetch_row($query_id);
        }
        
        if ($record) {
            foreach ($record as $key => $val) {
                if ($val !== null) {
                    $record[$key] = stripslashes((string)$val);
                }
            }
        }
        return $record;
    }

    /**
     * Query the first line only
     * 
     * @param mysqli_result $query_id
     * @param bool $assoc
     * @return array|null
     */
    protected function _fetch_first($query_id, bool $assoc = false): ?array {
        return $this->_fetch($query_id, $assoc);
    }

    /**
     * Fetch all results as array from the current query
     * 
     * @param mysqli_result $query_id
     * @param bool $assoc
     * @return array
     */
    protected function _fetch_all($query_id, bool $assoc = false): array {
        $arr = array();
        while ($row = $this->_fetch($query_id, $assoc)) {
            $arr[] = $row;
        }
        return $arr;
    }

    /**
     * Relocation the pointer in the result
     * 
     * @param mysqli_result $query_id
     * @param int $pos
     */
    protected function _seek($query_id, int $pos): void {
        if ($pos < 0) return;
        if ($query_id instanceof mysqli_result) {
            mysqli_data_seek($query_id, $pos);
        }
    }

    /**
     * Free result
     * 
     * @param mixed $query_id
     */
    protected function _release($query_id): void {
        if ($query_id instanceof mysqli_result) {
            mysqli_free_result($query_id);
        }
    }
}