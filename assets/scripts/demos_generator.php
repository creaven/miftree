<?php
$demos = json_decode(file_get_contents(dirname(__FILE__).'/../../Demos/demos.json'));
foreach($demos as $demo=>$v){
	$index_html = file_get_contents(dirname(__FILE__).'/../../Demos/'.$demo.'/index.html');
	echo preg_replace('/(<!--scripts-->.*<!--end_scripts-->)/ms', 'replacement', $index_html);
	break;
}
