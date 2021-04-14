import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  url= 'http://localhost/'

  constructor(private http: HttpClient) { }

  registro(users){ 
    return this.http.post(`${this.url}registrar.php`, JSON.stringify(users));
  }

  recuperar(){
    return this.http.get(`${this.url}recuperar.php`);
  }

  modificarUser(users) {
    return this.http.post(`${this.url}modificarUser.php`, JSON.stringify(users));    
  }
  
  eliminar(idMatricula: number) {
    return this.http.get(`${this.url}eliminar.php?idMatricula=${idMatricula}`);
  }

  select(idMatricula){
    return this.http.get(`${this.url}buscar.php?idMatricula=${idMatricula}`);
  }

  buscarReporte(){
    return this.http.get(`${this.url}reportesAdmin.php`);
  }

  selectReporte(idReporte: Number){
    return this.http.get(`${this.url}reporteAdmin.php?idReporte=${idReporte}`);
  }

  borrarReporte(idReporte: Number){
    return this.http.get(`${this.url}borrarReporte.php?idReporte=${idReporte}`);
  }

  login(users){
    return this.http.post(`${this.url}login.php`, JSON.stringify(users));
  }
}
