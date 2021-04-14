<?php
 header('Access-Control-Allow-Origin: *'); 
 header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

 include("config.php");

$json = file_get_contents('php://input');
 
$params = json_decode($json);

$con = conexion();
 
$query = mysqli_query($con, "select * from tcorreosregistro where email='$params->email'
and idMatricula='$params->idMatricula'");
$registro = mysqli_num_rows($query); 

class Result {}
$response = new Result();
$resultado = 'OK';

if ($registro == 0){
  $response->resultado = 'Error';
  $response->mensaje = 'el email o matricula no pertenecen a la institucion';
}

if ($registro > 0){

  $query2 = mysqli_query($con, "select * from tconductores where email='$params->email'
  and idMatricula='$params->idMatricula'");
  $registro2 = mysqli_num_rows($query2);

  if ($registro2 > 0){
    $response->resultado = 'Error';
    $response->mensaje = 'el email y matricula se encuentran registrados';
  }else{
    mysqli_query($con, "INSERT INTO tconductores (nombre,celular,curp,email,password,idMatricula) 
    VALUES ('$params->nombre','$params->celular','$params->curp','$params->email',
    '$params->password', '$params->idMatricula')");
  
    $response->resultado = 'OK';
    $response->mensaje = 'usuario registrado';
  }
}

 header('Content-Type: application/json');
 echo json_encode($response);
?>