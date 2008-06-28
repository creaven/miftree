<?
include_once 'common.php';
include_once 'URL.php';

$root_path=realpath($root);

$abs_path=$_GET['abs_path'];

if(substr($root_path,0,strlen($root_path))!=substr(realpath($_GET['abs_path']),0,strlen($root_path))){
	exit();
}

if(in_array('.',URL::A($abs_path))||in_array('..',URL::A($abs_path))){
	exit();
}

$d = @opendir($_GET['abs_path']);
if (!$d) return;
chdir($_GET['abs_path']);
$children=array();
while (($e=readdir($d)) !== false) {
    if ($e=='.' || $e=='..') continue;
    if (!@is_dir($e)){
		$children[]=array(
			'property' => array(
				'name' => $e
			),
			'type' => 'file'
		);
	}else{
		$children[]=array(
			'property' => array(
				'name' => $e
			),
			'type' => 'folder',
			'data' => array(
				'abs_path' => realpath($e)
			)
		);
	}
}
closedir($d);
echo json_safe_encode($children);
?>