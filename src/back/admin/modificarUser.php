<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  
  include("config.php");
  $con=conexion();
  
  mysqli_query($con,"update tcorreosregistro set email='$params->email',
  password='$params->password' 
  where idMatricula='$params->idMatricula'");  
  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'usuario actualizado';

  header('Content-Type: application/json');
  echo json_encode($response);  
?>