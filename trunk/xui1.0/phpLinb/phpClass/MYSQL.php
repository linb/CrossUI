<?php
class MYSQL{
    // server host
    public $host;
    // log in user
    public $user;
    // password
    public $pass;
    // target db name
    public $dbname;

    //connect id
    public $link_id = 0;
    //is in a transaction process
    public $in_transaction=0;

   /**
   * connect and select database
   */
   function connect($host, $user, $pass, $dbname="") {
        $this->link_id=@mysql_connect($host,$user,$pass);
        //open failed
        if (!$this->link_id)
            throw new LINB_E("Cant connect to server: $host.");
            
        $this->host = $host;
        $this->user = $user;
        $this->pass = $pass;
        if($dbname)
            $this->selectdb($dbname);
   }

   /**
   * close the connection
   */
    function close() {
        //open failed
        if(!mysql_close())
            throw new LINB_E("Connection close failed.");
    }
    
    /**
    * select database
    **/
    function selectdb($dbname) {
        //cant find the database
        if(!@mysql_select_db($dbname, $this->link_id))
            throw new LINB_E("Cant open database: $dbname'</b>");
       $this->dbname = $dbname;
    }
    
    /**
    * list all databases
    **/
    function listdbs($assoc=false) {
        $i = @mysql_list_dbs($this->link_id);
        $r = $this->_fetch_all($i, $assoc);
        $this->_release($i);
        return $r;
    }
    
    /**
    * list all tables
    **/
    function listtables($dbname, $assoc=false) {
        return $this->query("SHOW TABLES FROM ".$dbname);
    }
   /**
   * query any string
   * return array [{},{},...]
   */
   public function query($any, $assoc=false) {
        $i = $this->_query($any);
        $r = $this->_fetch_all($i, $assoc);
        $this->_release($i);
        return $r;
   }
    
   /**
   * select
   * return array [{},{},...]
   */
   public function select($table, $fields, $where='', $all=false, $assoc=false) {
        $q="SELECT ".$fields.' FROM '.$table.' WHERE '.$where;
        $i = $this->_query($q);
        if($all)
            $r = $this->_fetch_all($i, $assoc);
        else
            $r = $this->_fetch_first($i, $assoc);
        $this->_release($i);
        return $r;
   }
   /**
   * update
   * return affected rows
   */
   public function update($table, $fields, $where='') {
        $q="UPDATE ".$table." SET ";
        foreach($fields as $key=>$val) {
            if(strtolower($val)=='null')
                $q.= "`$key` = NULL, ";
            elseif(strtolower($val)=='now()')
                $q.= "`$key` = NOW(), ";
            else
                $q.= "`$key`='".mysql_real_escape_string($val)."', ";
        }
        $qq = rtrim($q, ', ').' WHERE '.$where.';';
        $i = $this->_query($qq);
        $r = @mysql_affected_rows();
        return $r;
   }

   /**
   * insert
   * return inserted id
   */
    public function insert($table, $fields) {
        $q="INSERT INTO ".$table." ";
        $v=''; $n='';
        foreach($fields as $key=>$val) {
            $n.="`$key`, ";
            if(strtolower($val)=='null')
                $v.="NULL, ";
            elseif(strtolower($val)=='now()')
                $v.="NOW(), ";
            else 
                $v.= "'".mysql_real_escape_string($val)."', ";
        }
        $q .= "(". rtrim($n, ', ') .") VALUES (". rtrim($v, ', ') .");";
        $i = $this->_query($q);
        $r = mysql_insert_id();
        return $r;
    }

   /**
   * delete
   * return affected rows
   */
    public function delete($table, $where = null) {
        $q = "DELETE FROM `".$table.'` WHERE '.$where.';';
        $i = $this->_query($q);
        $r = @mysql_affected_rows();
        return $r;
    }


    /**
     * starts a transaction
     */
    public function TransactionBegin() {
        if (! $this->in_transaction) {
            if (! mysql_query("START TRANSACTION", $this->link_id))
                throw new LINB_E("Cant start TRANSACTION in this server: $this->host.");
            else
                $this->in_transaction = 1;
        }else
            throw new LINB_E("Already in transaction: $this->in_transaction.");
    }
    /**
     * ends the current transaction and commits
     */
    public function TransactionEnd() {
        if ($this->in_transaction) {
            if (! mysql_query("COMMIT", $this->link_id))
                throw new LINB_E("Cant commit a transaction: $this->in_transaction.");
            else
                $this->in_transaction = 0;
        }else
            throw new LINB_E("Not in a transaction");
    }

    /**
     * rolls the current transaction back
     */
    public function TransactionRollback() {
        if(! mysql_query("ROLLBACK", $this->link_id))
            throw new LINB_E("Could not rollback transaction: $this->in_transaction.");
        else
            $this->in_transaction = 0;
    }
    
    /*
    *====================================================
    *====================================================
    */

   /**
   * executes SQL query
   * @param
   *    $query_string :  SQL query string to execute
   * @return query_id for the further
   */
    function _query($query_string) {
        $query_id = @mysql_query($query_string,$this->link_id);
        if (!$query_id)
            throw new LINB_E("Query fail: $query_string");
        return $query_id;
    }

   /**
   * fetch one line result from the current query
   */
    function _fetch($query_id, $assoc=false) {
        if (!isset($query_id) )
            throw new LINB_E("Invalid query_id $query_id.");
        if($assoc)
            $record = @mysql_fetch_assoc($query_id);
        else
            $record = @mysql_fetch_row($query_id);
        if($record)
            foreach($record as $key=>$val)
                $record[$key]=stripslashes($val);
        return $record;
    }

   /**
   * query the first line only
   */
    function _fetch_first($query_id, $assoc=false) {
        $arr = $this->_fetch($query_id, $assoc);
        return $arr;
    }

    /**
   * fetch all results as array from the current query
   */
    function _fetch_all($query_id, $assoc=false) {
        $arr = array();
        while ($row = $this->_fetch($query_id, $assoc))
            $arr[] = $row;
        return $arr;
    }

   /**
   * relocation the pointer in the result
   */
   function _seek($query_id, $pos) {
        if($pos<=0) return;
        if(eregi("[0-9]",$pos))
            mssql_data_seek($query_id,$pos);
   }

   /**
   * free result
   */
    function _release($query_id) {
        if(!@mysql_free_result($query_id))
            throw new LINB_E("Result set ID $this->query_id not freed.");
    }
    
}
?>