<?php
class test extends Unit
{
    public function stimulate(&$hash){
        //if request obj doesnt inlucde p1, server will return  'server_set1'
        LINB::checkArgs($hash, array(
            'string' => array(
                'p1' => 'server_set',
                'p2' => 'server_set'
            )
        ));
        $hash->time=date("Y-m-d H:i:s", time()) ;
        $hash->rand=$this->randString();
        return array($hash);
    }
    
    private function randString() {
        $chars = "abcdefghijkmnopqrstuvwxyz023456789";
        srand((double)microtime()*1000000);
        $i = 0;
        $pass = date('h-i-s') ;
    
        while ($i <= 16) {
            $num = rand() % 33;
            $tmp = substr($chars, $num, 1);
            $pass = $pass . $tmp;
            $i++;
        }
        return $pass;
    }
}
?>
