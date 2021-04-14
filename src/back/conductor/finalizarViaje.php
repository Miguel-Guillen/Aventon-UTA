<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);

  include("config.php");
  $con=conexion();

  $query = mysqli_query($con,"select * from tviajes where latitudD='$params->latitudD'
  and longitudD='$params->longitudD' and idMatricula='$params->idMatricula' and estado=1");
  $registro = mysqli_num_rows($query);

  class Result {}
  $response = new Result();
  $response->resultado = 'OK';

  if($registro > 0){
    mysqli_query($con,"update tviajes set estado='$params->estado' where latitudD='$params->latitudD'
    and longitudD='$params->longitudD' and idMatricula='$params->idMatricula'");
    $response->mensaje = 'viaje terminado';
  }

  header('Content-Type: application/json');
  echo json_encode($response);  
?>