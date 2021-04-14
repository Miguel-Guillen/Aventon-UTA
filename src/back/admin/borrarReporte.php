<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  include("config.php");
  $con=conexion();
  
  mysqli_query($con,"delete from treportes where idReporte=$_GET[idReporte]");
    
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Reporte borrado';

  header('Content-Type: application/json');
  echo json_encode($response);  
?>