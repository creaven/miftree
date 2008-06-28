<?
include_once 'common.php';

$path=realpath($root);
$root=array(
	array(
		'property' => array(
			'name' => basename($path)
		),
		'type' => 'folder',
		'data' => array(
			'abs_path' => $path
		)
	)
);

echo json_safe_encode($root);

?>