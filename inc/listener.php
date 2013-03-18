<?php
  chdir('../live');
  $fileMod = array("html"=>0,"css"=>0,"js"=>0);
  foreach ($fileMod as $key => $val) { $fileMod[$key] = filemtime('live.'.$key); }
  echo json_encode($fileMod);
?>