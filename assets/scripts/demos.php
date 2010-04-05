<?php ob_start();?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<title>Mif.Tree Demos</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<link rel="stylesheet" type="text/css" media="screen" href="../assets/styles/demos.css" />
	<!--script type="text/javascript" src="../assets/scripts/mootools.js"></script>
	<script type="text/javascript" src="../assets/scripts/Builder.js"></script>
	<script type="text/javascript" src="../assets/scripts/demos.js"></script-->
</head>
<body>
	<h1><a href=".."><span class="mif-m">M</span><span class="mif-i">i</span><span class="mif-f">f</span><span class="mif-dot">.</span><span class="mif-tree">Tree</span></a> <span>Demos</span></h1>
	<div class="demos">
	<?php
	$demos = json_decode(file_get_contents(dirname(__FILE__).'/../../Demos/demos.json'));
	foreach($demos as $demo=>$v):?>
		<div class="demo">
			<a href="<?=$demo?>/index.html">
				<img src="<?=$demo;?>/preview.png"></img>
				<div class="title"><?=$v->title;?></div>
			</a>
		</div>
	<?php endforeach;?>
	</div>
</body>
</html>
<?php
$content = ob_get_contents();
ob_clean();
ob_flush();
file_put_contents(dirname(__FILE__).'/../../Demos/index.html', $content);
?>