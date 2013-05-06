<?php
class zip  {
	public $compressedData = array();
	public $centralDirectory = array(); // central directory
	public $endOfCentralDirectory = "\x50\x4b\x05\x06\x00\x00\x00\x00"; //end of Central directory record
	public $oldOffset = 0;

	/**
	 * Function to create the directory where the file(s) will be unzipped
	 *
	 * @param $directoryName string
	 *
	 */

	public function addDirectory($directoryName) {
		$directoryName = str_replace("\\", "/", $directoryName);

		$feedArrayRow = "\x50\x4b\x03\x04";
		$feedArrayRow .= "\x0a\x00";
		$feedArrayRow .= "\x00\x00";
		$feedArrayRow .= "\x00\x00";
		$feedArrayRow .= "\x00\x00\x00\x00";

		$feedArrayRow .= pack("V",0);
		$feedArrayRow .= pack("V",0);
		$feedArrayRow .= pack("V",0);
		$feedArrayRow .= pack("v", strlen($directoryName) );
		$feedArrayRow .= pack("v", 0 );
		$feedArrayRow .= $directoryName;

		$feedArrayRow .= pack("V",0);
		$feedArrayRow .= pack("V",0);
		$feedArrayRow .= pack("V",0);

		$this -> compressedData[] = $feedArrayRow;

		$newOffset = strlen(implode("", $this->compressedData));

		$addCentralRecord = "\x50\x4b\x01\x02";
		$addCentralRecord .="\x00\x00";
		$addCentralRecord .="\x0a\x00";
		$addCentralRecord .="\x00\x00";
		$addCentralRecord .="\x00\x00";
		$addCentralRecord .="\x00\x00\x00\x00";
		$addCentralRecord .= pack("V",0);
		$addCentralRecord .= pack("V",0);
		$addCentralRecord .= pack("V",0);
		$addCentralRecord .= pack("v", strlen($directoryName) );
		$addCentralRecord .= pack("v", 0 );
		$addCentralRecord .= pack("v", 0 );
		$addCentralRecord .= pack("v", 0 );
		$addCentralRecord .= pack("v", 0 );
		$ext = "\x00\x00\x10\x00";
		$ext = "\xff\xff\xff\xff";
		$addCentralRecord .= pack("V", 16 );

		$addCentralRecord .= pack("V", $this -> oldOffset );
		$this -> oldOffset = $newOffset;

		$addCentralRecord .= $directoryName;

		$this -> centralDirectory[] = $addCentralRecord;
	}

	/**
	 * Function to add file(s) to the specified directory in the archive
	 *
	 * @param $directoryName string
	 *
	 */

	public function addFile($data, $directoryName)   {

		$directoryName = str_replace("\\", "/", $directoryName);

		$feedArrayRow = "\x50\x4b\x03\x04";
		$feedArrayRow .= "\x14\x00";
		$feedArrayRow .= "\x00\x00";
		$feedArrayRow .= "\x08\x00";
		$feedArrayRow .= "\x00\x00\x00\x00";

		$uncompressedLength = strlen($data);
		$compression = crc32($data);
		$gzCompressedData = gzcompress($data);
		$gzCompressedData = substr( substr($gzCompressedData, 0, strlen($gzCompressedData) - 4), 2);
		$compressedLength = strlen($gzCompressedData);
		$feedArrayRow .= pack("V",$compression);
		$feedArrayRow .= pack("V",$compressedLength);
		$feedArrayRow .= pack("V",$uncompressedLength);
		$feedArrayRow .= pack("v", strlen($directoryName) );
		$feedArrayRow .= pack("v", 0 );
		$feedArrayRow .= $directoryName;

		$feedArrayRow .= $gzCompressedData;

		$feedArrayRow .= pack("V",$compression);
		$feedArrayRow .= pack("V",$compressedLength);
		$feedArrayRow .= pack("V",$uncompressedLength);

		$this -> compressedData[] = $feedArrayRow;

		$newOffset = strlen(implode("", $this->compressedData));

		$addCentralRecord = "\x50\x4b\x01\x02";
		$addCentralRecord .="\x00\x00";
		$addCentralRecord .="\x14\x00";
		$addCentralRecord .="\x00\x00";
		$addCentralRecord .="\x08\x00";
		$addCentralRecord .="\x00\x00\x00\x00";
		$addCentralRecord .= pack("V",$compression);
		$addCentralRecord .= pack("V",$compressedLength);
		$addCentralRecord .= pack("V",$uncompressedLength);
		$addCentralRecord .= pack("v", strlen($directoryName) );
		$addCentralRecord .= pack("v", 0 );
		$addCentralRecord .= pack("v", 0 );
		$addCentralRecord .= pack("v", 0 );
		$addCentralRecord .= pack("v", 0 );
		$addCentralRecord .= pack("V", 32 );

		$addCentralRecord .= pack("V", $this -> oldOffset );
		$this -> oldOffset = $newOffset;

		$addCentralRecord .= $directoryName;

		$this -> centralDirectory[] = $addCentralRecord;
	}

	/**
	 * Fucntion to return the zip file
	 *
	 * @return zipfile (archive)
	 */

	public function getZippedfile() {
		$data = implode("", $this -> compressedData);
		$controlDirectory = implode("", $this -> centralDirectory);
		return
			$data.
			$controlDirectory.
			$this -> endOfCentralDirectory.
			pack("v", sizeof($this -> centralDirectory)).
			pack("v", sizeof($this -> centralDirectory)).
			pack("V", strlen($controlDirectory)).
			pack("V", strlen($data)).
			"\x00\x00";
	}

	/**
	 *
	 * Function to force the download of the archive as soon as it is inDom
	 *
	 * @param archiveName string - name of the inDom archive file
	 */

	public function forceDownload($archiveName) {
		if(ini_get('zlib.output_compression')) {
			ini_set('zlib.output_compression', 'Off');
		}
		header("Pragma: public");
		header("Expires: 0");
		header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
		header("Cache-Control: private",false);
		header("Content-Type: application/zip");
		header("Content-Disposition: attachment; filename=\"".basename($archiveName)."\";" );
		header("Content-Transfer-Encoding: binary");
		header("Content-Length: ".@filesize($archiveName));
		set_time_limit(0);
		@readfile("$archiveName");
	 }
}

/**
 * IO class for phpLINB
 * from SNakeVil and other code
 */
class IO{

	/**
	 * the last touched dir
	 * for deep copy or move
	 *
	 * @var string
	 */
	private $last_dir;

	function IO() {
		$this->last_dir = "";
		return $this;
	}

	/**
	 * list all files and folders of a dir
	 *
	 * @param string $path
	 * @return array
	 */
	function dirList($path=".") {
		$i = "/"==DIRECTORY_SEPARATOR ? "\\" : "/";
		$path = str_replace($i, DIRECTORY_SEPARATOR, strval($path));

		if (!is_dir($path)) throw new LINB_E("$path is not a path");
		if (!is_readable($path)) throw new LINB_E("$path is not readable");

		$dh = @opendir($path);
		$result = array();
		$path = realpath($path);
		if ($path[strlen($path)-1]!=DIRECTORY_SEPARATOR) $path .= DIRECTORY_SEPARATOR;
		while (FALSE!==($fh=readdir($dh))) {
			if ($fh=="."||$fh=="..") continue;
			$i = $path.$fh;
			$t = array(
			"name" => $fh,
			"location" => $i,
			"type" => is_file($i) ? 1 : (is_dir($i) ? 0 : -1)
			);
			$result[] = $t;
		}
		closedir($dh);
		unset($dh, $fh, $t, $i);
		clearstatcache();
		return $result;
	}


	/**
	 * get the information for file or dir
	 *
	 * @param string $path
	 * @return array
	 */
	function info($path=".") {
		$path = realpath($path);
		if (!$path)  throw new LINB_E("$path is not a path");
		$result = array(
		"name" => substr($path, strrpos($path, DIRECTORY_SEPARATOR)+1),
		"location" => $path,
		"type" => is_file($path) ? 1 : (is_dir($path) ? 0 : -1),
		"size" => filesize($path),
		"access" => fileatime($path),
		"modify" => filemtime($path),
		"change" => filectime($path),
		"read" => is_readable($path),
		"write" => is_writeable($path)
		);
		clearstatcache();
		return $result;
	}


	/**
	 * search files or dirs in dir
	 * regex
	 *
	 * @param string $pattern
	 * regex for search,  /^ $/??default .*
	 * @param string $path
	 * dst path
	 * @param number $type
	 * 0:search folder only, 1(default):search file only, -1: all
	 * @param number $sub_dir_level
	 * deep sub folder number, defalut is 0
	 * @param number $limit
	 * the max result
	 * @return array
	 * fail:false,
	 * success: array(array("name","locate","type"))
	 */
	function search($pattern=".*", $path=".", $type=1, $sub_dir_level=0, $limit=100, $pid='*') {
		// check parameters
		$is_error = $type!=1 && $type!=0 && $type!=-1;
		$is_error = $is_error && (!is_int($sub_dir_level) || $sub_dir_level < 0);
		$is_error = $is_error && (!is_int($limit) || $limit < 1);
		if ($is_error) throw new LINB_E('Can\'t seek file.');
		$id=0;
		$td='';
		unset($is_error);
		$result = array();
		// === for  "rray() == FALSE"
		if (FALSE===$i=$this->dirList($path)) return FALSE;
		for ($j=0,$k=count($i);$j<$k;$j++) {
			// not dir or file
			if ($i[$j]["type"]==-1) continue;
			$id++;
			$td=$pid.'.'.(string)$id;

			if ($type+$i[$j]["type"]==1||!preg_match("/^".$pattern."$/", $i[$j]["name"])) continue;

			// for sub
			if ($i[$j]["type"]==0&&$sub_dir_level) {
				if (FALSE===$l=$this->search($pattern,$i[$j]["location"],$type,($sub_dir_level - 1),$limit, $td)) return FALSE;
				$result = array_merge($result, $l);
			}
			$i[$j]['layer']=$sub_dir_level;
			$i[$j]['id']=$td;
			$i[$j]['pid']=$pid;
			$result[] = $i[$j];
			if (count($result)>=$limit) {
				array_splice($result, $limit);
				break;
			}
		}
		unset($i, $j, $k, $l, $id, $td);
		return $result;
	}


	/**
	 * delete file or dir
	 *
	 * @param string $path
	 * @return string
	 */
	function delete($path="") {
		$path = realpath($path);
		if (!$path)  throw new LINB_E("$path is not a path");
		if (!is_dir($path)) {
			if (@unlink($path)) return TRUE;
			 throw new LINB_E("Can\'t delete file -- $path");
		} else {
			if (FALSE===$i=$this->dirList($path)) return FALSE;
			for ($j=0,$k=count($i);$j<$k;$j++)
			if (!$this->delete($i[$j]["location"])) return FALSE;
			unset($i, $j, $k);
			if(!@rmdir($path)) return FALSE;
			return TRUE;
		}
	}


	/**
	 * get abs path for file or dir(exist or not exist)
	 *
	 * @param string $path
	 * @return string
	 */
	function absPath($path="") {
		$i = "/"==DIRECTORY_SEPARATOR ? "\\" : "/";
		$path = str_replace($i, DIRECTORY_SEPARATOR, strval($path));
		if ($path[strlen($path)-1]!=DIRECTORY_SEPARATOR) $path .= DIRECTORY_SEPARATOR;
		// get the position of first seperator
		$i = strpos($path, DIRECTORY_SEPARATOR);
		$ext = substr($path, $i+1);
		$path = substr($path, 0, $i+1);
		// get the base path
		if ($i=realpath($path)) $path = $i;
		else {
			$ext = $path.$ext;
			$path = realpath(".");
		}
		if (strlen($ext)) {
			$ext = preg_replace("/[\:\*\?\"\<\>\|]/", "", explode(DIRECTORY_SEPARATOR, $ext));
			array_pop($ext);
			$path = explode(DIRECTORY_SEPARATOR, $path);
			if ($path[count($path)-1]=="") array_pop($path);
			while (count($ext)) {
				$i = array_shift($ext);
				if ($i==".."&&count($path)>1) array_pop($path);
				elseif (""!=str_replace(".", "", $i)) $path[] = $i;
			}
			$path = implode(DIRECTORY_SEPARATOR, $path);
		}
		unset($ext, $i);
		return $path;
	}

	/**
	 * create dir
	 * rel, abs or deep path(a/b/c)
	 *
	 * @param string $path
	 * @return bool
	 */
	function dirMake($path="", $short=false) {
	    if($short){
	        $path=$this->absPath($path);
	        if (!@mkdir($path))  throw new LINB_E("Can\'t make dir --$path");
	    }else{
    		$i = explode(DIRECTORY_SEPARATOR, $this->absPath($path));
    		$path = array_shift($i);
    		for ($j=0,$k=count($i);$j<$k;$j++) {
    			$path .= DIRECTORY_SEPARATOR.$i[$j];
    			if (!is_dir($path)) {
    				if ($this->last_dir=="") $this->last_dir = $path;
    				if (!@mkdir($path))  throw new LINB_E("Can\'t make dir --$path");
    			}
    		}
    	}

		if ($this->last_dir=="") $this->last_dir = $path;
		return TRUE;
	}


	/**
	 * compare two files
	 *
	 * @param string $src
	 * @param  string $dst
	 * @param bool $bigger
	 * @return bool
	 */
	function fileCompare($src="", $dst="", $bigger=TRUE) {
		if (!is_file($src)||!is_file($dst))  throw new LINB_E("$src or $dst is not a file");
		if (!is_readable($src))  throw new LINB_E("$src is not readable");
		if (!is_readable($dst))  throw new LINB_E("$dst is not readable");
		$i = filesize($src);
		if (filesize($dst)!=$i) {
			unset($i);
			return FALSE;
		}
		// >1M
		if ($i>1024*1024*1024&&!$bigger) {
			unset($i);
			return TRUE;
		}
		unset($i);
		//md5 check
		if (md5_file($src)!=md5_file($dst)) return FALSE;
		return TRUE;
	}

	/**
	 * file or folder copy
	 *
	 * @param string $src : file or folder / rel or abs path
	 * @param string $dst : file or folder / rel or abs path
	 * @param bool $submap : hidden
	 * @return bool
	 */
	function copy($src="", $dst="", $submap=FALSE) {
		if (!$src=realpath($src)) throw new LINB_E("$src is not a path");
		$dst = $this->absPath($dst);
		if (is_dir($src)) {
			if (!is_readable($src))  throw new LINB_E("$src is not readalbe");
			if ($dst[strlen($dst)-1]!=DIRECTORY_SEPARATOR) $dst .= DIRECTORY_SEPARATOR;
			// the source is the last touched dir
			if (TRUE===$submap&&$src==$this->last_dir) return TRUE;
			// the last touched dir is ''
			if (TRUE!==$submap) $this->last_dir = "";
			// create dir
			if (!$this->dirMake($dst)) return FALSE;
			// error on read dir
			if (FALSE===$i=$this->dirList($src)) return FALSE;
			for ($j=0,$k=count($i);$j<$k;$j++) if (!$this->copy($i[$j]["location"], $dst.$i[$j]["name"],TRUE)) return FALSE;
			unset($i, $j, $k);
			RETURN TRUE;
		} else {
			if (!is_readable($src))  throw new LINB_E("$src is not readable");
			if ($this->fileCompare($src,$dst)) return TRUE;
			if (!copy($src,$dst))  throw new LINB_E("copy error.");
			if (!$this->fileCompare($src,$dst)) {
				//fail, delete all
				@unlink($dst);
				throw new LINB_E("copy error");
			}
			return TRUE;
		}
	}


	/**
	 * file or folder move
	 *
	 * @param string $src : file or folder / rel or abs path
	 * @param string $dst : file or folder / rel or abs path
	 * @param bool $submap : hidden
	 * @return bool
	 */
	function move($src="", $dst="", $submap=FALSE) {
		if (!$src=realpath($src))  throw new LINB_E("$src is not a path");
		$dst = $this->absPath($dst);
		if (is_dir($src)) {
			if (!is_readable($src))  throw new LINB_E("$src is not readable");
			if ($dst[strlen($dst)-1]!=DIRECTORY_SEPARATOR) $dst .= DIRECTORY_SEPARATOR;
			if (TRUE===$submap&&$src==$this->last_dir) return TRUE;
			if (TRUE!==$submap) $this->last_dir = "";
			if (!$this->dirMake($dst)) return FALSE;
			if (FALSE===$i=$this->dirList($src)) return FALSE;
			for ($j=0,$k=count($i);$j<$k;$j++) if (!$this->move($i[$j]["location"], $dst.$i[$j]["name"],TRUE)) return FALSE;
			unset($i, $j, $k);
			if (FALSE===strpos($this->last_dir,$src))
			// delete sub folder
			if (!@rmdir($src))  throw new LINB_E("Can\'t delete $src");
			return TRUE;
		} else {
			if (!is_readable($src))  throw new LINB_E("$src is not readable");
			if ($this->fileCompare($src,$dst)) return TRUE;
			if (!copy($src,$dst))  throw new LINB_E("copy error");
			if (!$this->fileCompare($src,$dst)) {
				@unlink($dst);
				throw new LINB_E("files are same");
			}
			// delete source
			if (!@unlink($src))  throw new LINB_E("Can\'t delete $src");
			return TRUE;
		}
	}

    /**
    * for replace is_dir in some case
    * $dirname is relative path: URL like string
    */
    function is_dir_ex($dirname) {
        $handle=opendir($dirname);
        if(readdir($handle)=='.')
            $result=true;
        else
            $result=false;
        closedir($handle);
        return $result;
    }

	/**
	 * get wording dir
	 */
	function dirCurrent(){
		return getcwd();
	}
	/**
	 * check file/path exists
	 *
	 * @param bool $path
	 */
	function exists($path){
		return file_exists($path);
	}

	/**
	 * get an string from a file
	 *
	 * @param string $path
	 * @return string
	 */
	function getString($path){
		$path = realpath($path);
		if (!$path)  throw new LINB_E("$path is not a path");
		return file_get_contents($path);
	}
	/**
	 * set an string to a file
	 *
	 * @param string $path
	 * @param string $s
	 */
	function setString($path,$s,$flag=false){
		return file_put_contents($path,$s,$flag);
	}
	/**
	 * get an array from a file
	 *
	 * @param string $path
	 * @return Array
	 */
	function getObject($path){
		$path = realpath($path);
		if (!$path)  throw new LINB_E("$path is not a path");
		return unserialize(file_get_contents($path));
	}

	function getJSONObject($path){
		$path = realpath($path);
		if (!$path)  throw new LINB_E("$path is not a path");
		return LINB::$json->decode(file_get_contents($path));
	}
	/**
	 * set an array to a file
	 *
	 * @param string $path
	 * @param array $a
	 */
	function setObject($path,$a){
		return file_put_contents($path, serialize($a));
	}
	function setJSONObject($path,$a){
		return file_put_contents($path, LINB::$json->encode($a));
	}

    function _zip($basepath, $path, $zip, $parentPath=null){
        $list = $this->dirList($this->absPath($basepath.DIRECTORY_SEPARATOR.$path));

        if(!is_null($parentPath)){
            $zip->addDirectory($parentPath);
            $parentPath=$parentPath.DIRECTORY_SEPARATOR;
        }
        
	    foreach($list as $v){
	        if($v['type'] === 0){
	            $this->_zip($basepath, $path.DIRECTORY_SEPARATOR.$v['name'], $zip, $parentPath.$v['name']);
	        }else{
	            $f = file_get_contents($v['location']);
	            $zip->addFile($f, $parentPath.$v['name']);
	        }
	    }
    }

	function zipDir4Download($path, $fileName){
	    $f = NULL;
	    $zip = new zip;

        $arr = explode('/', $path);
        $name = array_pop($arr);
        $path=implode('/', $arr);

	    $this->_zip($path, $name, $zip);

        $fd = fopen ($fileName, "wb");
        $out = fwrite ($fd, $zip -> getZippedfile());
        fclose ($fd);

        $zip -> forceDownload($fileName);
        @unlink($fileName);
	}
}

?>
