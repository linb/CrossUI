<?php
class DBProcess extends Unit
{
    const DB_HOST='localhost';
    const DB_USER='radoncec_linb';
    const DB_PASS='radoncec_linb';
    const DB_DBNAME='radoncec_linb';

    public function stimulate(&$hash){        
        $db = new MYSQL;
        $db->connect(self::DB_HOST, self::DB_USER, self::DB_PASS);
        @mysql_query("SET NAMES 'UTF8'");

        //must have a string parameter 'action'
        LINB::checkArgs($hash, array(
            'string' => array(
                'action' => NULL
            )
        ));

        //handle the process
        switch($hash->action) {
            case 'listdbs':
                return $db->listdbs();
            case 'listtables':
                LINB::checkArgs($hash, array(
                    'string' => array(
                        'dbname' => NULL
                    )
                ));
                return $db->listtables($hash->dbname);
            case 'list':
                LINB::checkArgs($hash, array(
                    'string' => array(
                        'dbname' => NULL,
                        'tablename' => NULL,
                        'page' => 1,
                        'count' => 20
                    )
                ));
                $db->selectdb($hash->dbname);
                $count = $db->query("select count(*) from " . $hash->tablename);
                $table = $db->query("select * from " . $hash->tablename . " where 1 limit " . ($hash->page-1)*20 . ", " . $hash->count, true);
                return array($count,$table);
        }
    }
}
?>
