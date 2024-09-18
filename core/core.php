<?php

	function setEnvironement(){
		$filename=".env";
		if(!file_exists($filename)){
			throw new Exception("$filename doesn't exist");
		}
		$content=file_get_contents($filename);
		$array=explode("\n",$content);
		foreach($array as $l){
			if(trim($l)!=='' && strpos(trim($l), '#')!==0 ){
				list($k,$v)=explode("=",$l,2);
				$v=trim($v);
				$v=trim($v,"'\'");
				putenv("$k=$v");
				$_ENV[$k]=$v;
			}
		}
	}