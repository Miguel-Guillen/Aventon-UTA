<?php
 header('Access-Control-Allow-Origin: *'); 
 header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

 include("config.php");

  $json = file_get_contents('php://input');
 
  $params = json_decode($json);

  $con = conexion();
 
    mysqli_query($con, "INSERT INTO treportes (motivo,ubicacion,descripcion,idMatricula,
    idPasajero,placas) VALUES ('$params->motivo','$params->ubicacion','$params->descripcion',
    '$params->idMatricula','$params->idPasajero','$params->placas')");

  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'usuario registrado';

 header('Content-Type: application/json');
 echo json_encode($response);
?>