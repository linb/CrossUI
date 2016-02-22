<?php
class DBProcess extends Unit
{
    const DB_HOST='localhost';
    const DB_USER='root';
    const DB_PASS='root';
    const DB_DBNAME='testDB';

    public function stimulate(&$hash){
        $db = new MYSQL;
        $db->connect(self::DB_HOST, self::DB_USER, self::DB_PASS, self::DB_DBNAME);
        $db->query("SET NAMES 'UTF8'");

        //must have a string parameter 'action'
        LINB::checkArgs($hash, array(
            'string' => array(
                'action' => NULL
            )
        ));

        //handle the process
        switch($hash->action) {
            case 'getlist':
                return $db->query("select `key`,`value` from `tbl_test`");
            case 'update':
                //must have string parameters 'key' and 'value'
                LINB::checkArgs($hash, array(
                    'string' => array(
                        'key' => NULL,
                        'value' => NULL
                    )
                ));
                $db->update("tbl_test",array("key"=>$hash->key, "value"=>$hash->value), "`key`='".$hash->key."'");
                return 'ok';
            case 'delete':
                //must have a string parameter 'key'
                LINB::checkArgs($hash, array(
                    'string' => array(
                        'key' => NULL
                    )
                ));
                $db->delete("tbl_test", "`key`='".$hash->key."'");
                return 'ok';
            case 'create':
                //must have string parameters 'key' and 'value'
                LINB::checkArgs($hash, array(
                    'string' => array(
                        'key' => NULL,
                        'value' => NULL
                    )
                ));
                $db->insert("tbl_test", array("key"=>$hash->key, "value"=>$hash->value));
                return 'ok';
        }
    }
}
?>
