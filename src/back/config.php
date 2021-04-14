<?php

function conexion() {
  $conexion = mysqli_connect("localhost", "root", "", "bdaventon");
  return $conexion;
}

?>