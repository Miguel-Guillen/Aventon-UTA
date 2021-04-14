import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { conductorModel } from '../interfaces/conductor.model';
import { viajeAceptarModel, viajeModel } from '../interfaces/pasajero.modelo';

@Injectable({
  providedIn: 'root'
})
export class ConductorSService {
  url= 'http://localhost/'

  constructor(private http: HttpClient) { }

  registro(cond: conductorModel){ 
    return this.http.post(`${this.url}registrarCond.php`, JSON.stringify(cond));
  }

  recuperar(){
    return this.http.get(`${this.url}recuperarCond.php`);
  }

  borrar(idMatricula: Number){
    return this.http.get(`${this.url}eliminarCond.php?idMatricula=${idMatricula}`);
  }

  solicitud(){
    return this.http.get(`${this.url}solicitudes.php`);
  }

  aceptarViaje(viajeA: viajeAceptarModel){
    return this.http.post(`${this.url}aceptarViaje.php`, JSON.stringify(viajeA));
  }

  viajesAceptado(){
    return this.http.get(`${this.url}viajeAceptado.php`);
  }

  terminarViaje(viajeT: viajeModel){
    return this.http.post(`${this.url}cancelarViaje.php`, JSON.stringify(viajeT));
  }

  finalizarViaje(viajeT: viajeModel){
    return this.http.post(`${this.url}finalizarViaje.php`, JSON.stringify(viajeT));
  }

  login(cond: conductorModel){
    return this.http.post(`${this.url}loginCond.php`, JSON.stringify(cond))
  }
}


