<?php
/**
* file uploader class
* @example
* new Uploader()->save($_FILES['file'],$save_path,'new_name.jpg');
*/
class Uploader
{
    /**
    * array - acceptable file types
    */
    public $mime_types;
    public $max_size;

    /**
    * string - file destination path at server
    */
    public $save_path;

    public function __construct(){
        $this->MIMETYPES = array(
            'ai' => 'application/postscript',
            'aif' => 'audio/x-aiff',
            'aiff' => 'audio/x-aiff',
            'asf' => 'video/x-ms-asf',
            'asx' => 'video/x-ms-asx',
            'avi' => 'video/avi',
            'bin' => 'application/octet-stream',
            'bmp' => 'image/bmp',
            'bz' => 'application/x-bzip',
            'bz2' => 'application/x-bzip2',
            'crt' => 'application/x-x509-ca-cert',
            'css' => 'text/css',
            'csv' => 'text/plain',
            'doc' => 'application/msword',
            'docx' => 'application/msword',
            'dot' => 'application/msword',
            'dxf' => 'application/dxf',
            'eps' => 'application/postscript',
            'gif' => 'image/gif',
            'gz' => 'application/x-gzip',
            'gzip' => 'application/x-gzip',
            'htm' => 'text/html',
            'html' => 'text/html',
            'ico' => 'image/x-icon',
            'jpg' => 'image/jpeg',
            'jpe' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'js' => 'text/javascript',
            'm4a' => 'audio/mp4',
            'mov' => 'video/quicktime',
            'mp3' => 'audio/mpeg',
            'mp4' => 'video/mp4',
            'mpeg' => 'video/mpeg',
            'mpg' => 'video/mpeg',
            'pdf' => 'application/pdf',
            'php' => 'text/plain',
            'phps' => 'text/plain',
            'png' => 'image/png',
            'pot' => 'application/vnd.ms-powerpoint',
            'ppa' => 'application/vnd.ms-powerpoint',
            'pps' => 'application/vnd.ms-powerpoint',
            'ppt' => 'application/vnd.ms-powerpoint',
            'ps' => 'application/postscript',
            'qt' => 'video/quicktime',
            'ra' => 'audio/x-pn-realaudio',
            'ram' => 'audio/x-pn-realaudio',
            'rtf' => 'application/rtf',
            'shtml' => 'text/html',
            'sit' => 'application/x-stuffit',
            'swf' => 'application/x-shockwave-flash',
            'sql' => 'text/plain',
            'tar' => 'application/x-tar',
            'tgz' => 'application/x-compressed',
            'tif' => 'image/tiff',
            'tiff' => 'image/tiff',
            'txt' => 'text/plain',
            'wav' => 'audio/wav',
            'wma' => 'audio/x-ms-wma',
            'wmf' => 'windows/metafile',
            'wmv' => 'video/x-ms-wmv',
            'xls' => 'application/vnd.ms-excel',
            'xlsx' => 'application/vnd.ms-excel',
            'xlt' => 'application/vnd.ms-excel',
            'z' => 'application/x-compressed',
            'zip' => 'application/zip'
         );
        $this->GROUPS = array(
            'office' => array('csv','doc','dot','pdf','pot','pps','ppt','rtf','txt','xls'),
            'image' => array('ai','bmp','dxf','eps','gif','ico','jpg','jpe','jpeg','pdf','png','ps','swf','tif','tiff','wmf'),
            'compressed' => array('bin','bz','bz2','gz','sit','tar','tgz','z','zip'),
            'video' => array('asf','asx','avi','mov','mpg','mpeg','mp4','qt','ra','ram','swf','wmv'),
            'audio' => array('mp3','m4a','ra','ram','wav','wma'),
            'web' => array('css','gif','ico','jpg','jpeg','js','htm','html','pdf','php','phps','png','shtml','sql'),
            'pdf' => array('pdf')
        );
        $this->mime_types = $this->MIMETYPES;
        $this->max_size = 10240000;
    }
    public function __destruct(){
        unset($this->MIMETYPES);
        unset($this->GROUPS);
    }

    public function set_type($mime_types){
        //it's array, set
        if(is_array($mime_types))
            $this->mime_types = $mime_types;
        //set to a group
        elseif(array_key_exists($mime_types, $this->GROUPS)){
            foreach($this->MIMETYPES as $key => $value)
                if(in_array($key, $this->GROUPS))
                    $this->mime_types[$key] = $value;

        }
    }
    public function set_maxsize($size){
        $this->max_size = $size;
    }

    public function check_size($file){
        if ($file["size"] > $this->max_size)
            throw new Exception('file is too large!');
    }
    public function get_ext($file){
        return pathinfo($file['name'],PATHINFO_EXTENSION);
    }


    /**
    * Check file type
    */
    public function check_type($file){
        // get file type
        $ext = pathinfo($file['name'],PATHINFO_EXTENSION);
        // make sure the image is a valid file type and that they type matches the extention
        if(!array_key_exists($ext,$this->mime_types))
            throw new Exception('Mime type invalid!');
        elseif($this->mime_types[$ext] != $file['type']){
            if($file['type']=='image/pjpeg' && $this->mime_types[$ext]=='image/jpeg')
                return;
            throw new Exception("file type '".$file['type']."' does not match file extention '".$this->mime_types[$ext]."'!");
        }
    }

    /**
    * Make sure uploaded file exists
    */
    public function check_temp($path){
        if(!is_file($path) || !is_uploaded_file($path))
            throw new Exception('could not find uploaded file!');
    }

   /**
   * Save target file
   * $file = $_FILE['upload_name'];
   */
    public function save($file, $save_path, $new_name=false){
        switch($file['error']){
            case 0:
                // check destination
                if(is_dir($save_path)){
                    if(is_writable($save_path))
                        $this->save_path = $save_path;
                    else
                        throw new Exception('Destination ¡°$save_path¡± is not writable!');
                }else
                    throw new Exception("Destination path is not valid: $save_path ");

                // make sure a file was uploaded
                $this->check_temp($file['tmp_name']);
                $this->check_size($file);
                $this->check_type($file);

                // use original file name if a new one is not supplied, replace spaces with underscores
                if(!$new_name)
                    $new_name = str_replace(' ','_',$file['name']);

                // build full file path for move
                $uploadfile = $save_path.$new_name;

                // if we're looking at an uploaded file and the file
                // can be moved then we're OK
                if(!move_uploaded_file($file['tmp_name'], $uploadfile))
                    throw new Exception('Could not move uploaded file - flog the webmaster');
                else{
                    // change permissions on the file
                    if(chmod($uploadfile,0755))
                        return $uploadfile;
                    else
                        throw new Exception('Could not change permissions on uploaded file - flog the webmaster');
                }
                return $uploadfile;
            case 1:
            case 2:
                throw new Exception('Your file was too large. Please edit your file or upload a different file.');
            case 3:
                throw new Exception('File upload incomplete - Please retry your upload.');
            case 4:
                throw new Exception('No file uploaded. Please select a file to upload.');
            case 6:
                throw new Exception('No temp folder on server - whack the server admin.');
            case 7:
                throw new Exception('Failed to write to disk.');
            default:
                throw new Exception('Unknown error occured.');
        }
    }
}
?>