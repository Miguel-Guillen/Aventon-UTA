import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pasajeroModel } from '../interfaces/pasajero.modelo';
import { reporteModel } from '../interfaces/reporte.modelo';

@Injectable({
  providedIn: 'root'
})
export class PasaServiceService {
  url= 'http://localhost/'

  constructor(private http: HttpClient) { }

  registro(pasa: pasajeroModel){ 
    return this.http.post(`${this.url}registrarPasa.php`, JSON.stringify(pasa));
  }

  recuperar(){
    return this.http.get(`${this.url}recuperarPasa.php`);
  }

  modificar(pasajeros) {
    return this.http.post(`${this.url}modificarPasa.php`, JSON.stringify(pasajeros));    
  }

  eliminar(idMatricula: number) {
    return this.http.get(`${this.url}eliminarPasa.php?idMatricula=${idMatricula}`);
  }

  select(idMatricula: Number){
    return this.http.get(`${this.url}buscarPasa.php?idMatricula=${idMatricula}`);
  }

  login(pasa: pasajeroModel){
    return this.http.post(`${this.url}loginPasa.php`, JSON.stringify(pasa))
  }

  reportar(report: reporteModel){
    return this.http.post(`${this.url}reportPasa.php`, JSON.stringify(report))
  }

  solicitarViaje(viaje){
    return this.http.post(`${this.url}solicitarViaje.php`, JSON.stringify(viaje))
  }

  viajeAceptado(idMatricula: Number){
    return this.http.get(`${this.url}viajePasa.php?idMatricula=${idMatricula}`);
  }

  cancelarViaje(viaje){
    return this.http.post(`${this.url}cancelarPasa.php`, JSON.stringify(viaje));
  }

  misViajes(idMatricula: Number){
    return this.http.get(`${this.url}misViajesPasa.php?idMatricula=${idMatricula}`);
  }
}
