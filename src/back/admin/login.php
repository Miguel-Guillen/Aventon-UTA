<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);

  include("config.php");
  $con=conexion();

  $query = mysqli_query($con,"select * from tcorreosregistro where email='$params->email' 
  and password='$params->password'");
  $registros = mysqli_num_rows($query);
    
  class Result {}
  $response = new Result();
  $resultado = 'OK';
  $error = 'Error';

  if($registros > 0){
    $response->resultado = 'OK';
    $response->mensaje = 'usuario confirmado';
  }

  if($registros == 0){
    $response->error = 'Error';
    $response->mensaje = 'credenciales incorrectas';
  }

  header('Content-Type: application/json');
  echo json_encode($response);
?>