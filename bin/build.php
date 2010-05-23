<?php

include dirname(__FILE__).'/../../packager/packager.php';

$packages = array('miftree', 'mifcore', 'stylesheet', 'mootools-core', 'mootools-more');
$files = array();
foreach($packages as $package){
	$files[] = dirname(__FILE__)."/../../" . $package . "/";
}
$pkg = new Packager($files);


$list = array();
$image = '';
$script = '';
$files = $pkg->complete_files(array_merge($pkg->get_all_files('Core'), $pkg->get_all_files('Mif.Tree')));
print_r($files);
foreach($files as $file){
	$path = '..'.array_pop(explode('../..', $pkg->get_file_path($file)));
	preg_match('/Image$/', $file, $matches);
	if(count($matches)){
		$image .= $pkg->get_file_source($file);
	}
	$list[] = $path;
	$script .= $pkg->get_file_source($file);
};


file_put_contents(dirname(__FILE__).'/../build/image.js', $image);
file_put_contents(dirname(__FILE__).'/../build/mif.tree.js', $script);

//demos
$scripts = "<!--scripts-->\n";
//$scripts .= "\t<script type=\"text/javascript\" src=\"../../image.js\"></script>\n";
foreach($list as $file){
	$scripts .= "\t<script type=\"text/javascript\" src=\"../../{$file}\"></script>\n";
}
$scripts .= "\t<!--end_scripts-->";

$demos = json_decode(file_get_contents(dirname(__FILE__).'/../Demos/demos.json'));
foreach($demos as $demo=>$v){
	$file = dirname(__FILE__).'/../Demos/'.$demo.'/index.html';
	$index_html = file_get_contents($file);
	$content = preg_replace('/<!--scripts-->(.*)<!--end_scripts-->/ms', $scripts, $index_html);
	file_put_contents($file, $content);
}
