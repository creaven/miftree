<?php

include dirname(__FILE__).'/../../packager/packager.php';

$packages = array('miftree', 'mifcore', 'stylesheet');
$files = array();
foreach($packages as $package){
	$files[] = dirname(__FILE__)."/../../../" . $package . "/";
}
$pkg = new Packager($files);
$list = array();
$image = '';
foreach($pkg->get_all_files() as $file){
	$path = '..'.array_pop(explode('../..', $pkg->get_file_path($file)));
	preg_match('/Image$/', $file, $matches);
	if(count($matches)){
		$image .= $pkg->get_file_source($file);
	}else{
		$list[] = $path;
	}
};
file_put_contents(dirname(__FILE__).'/../../image.js', $image);
file_put_contents(dirname(__FILE__).'/../../list', implode("\n", $list));