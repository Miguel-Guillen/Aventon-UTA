<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  include("config.php");
  $con=conexion();
  
  mysqli_query($con,"delete from tconductores where idMatricula=$_GET[idMatricula]");
    
  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Conductor borrado';

  header('Content-Type: application/json');
  echo json_encode($response);  
?>