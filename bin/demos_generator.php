<?php

$scripts = "<!--scripts-->\n";
$scripts .= "\t<script type='text/javascript' src='../../image.js'></script>\n";
$list = explode("\n", file_get_contents(dirname(__FILE__).'/../../list'));
foreach($list as $file){
	$scripts .= "\t<script type='text/javascript' src='../{$file}'></script>\n";
}
$scripts .= "\t<!--end_scripts-->";

$demos = json_decode(file_get_contents(dirname(__FILE__).'/../../Demos/demos.json'));
foreach($demos as $demo=>$v){
	$file = dirname(__FILE__).'/../../Demos/'.$demo.'/index.html';
	$index_html = file_get_contents($file);
	$content = preg_replace('/<!--scripts-->(.*)<!--end_scripts-->/ms', $scripts, $index_html);
	file_put_contents($file, $content);
}
