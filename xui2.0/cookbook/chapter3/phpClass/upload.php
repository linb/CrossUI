<?php
class upload extends Unit
{
    public function stimulate(&$hash){
        if ($_FILES["file"]["error"] > 0)
            return array("message"=>"No file!");
        else
            return array("message"=>"Service got file '". $_FILES["file"]["name"]."'(size:".$_FILES["file"]["size"].")");
    }
}
?>
