<?php
 header('Access-Control-Allow-Origin: *'); 
 header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

 include("config.php");

  $json = file_get_contents('php://input');
 
  $params = json_decode($json);

  $con = conexion();
 
  mysqli_query($con, "INSERT INTO tviajes (latitud,longitud,latitudD,longitudD, idMatricula) VALUES 
	('$params->latitud','$params->longitud','$params->latitudD','$params->longitudD','$params->idMatricula')");

  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'viaje solicitado';

 header('Content-Type: application/json');
 echo json_encode($response);
?>