import { Component, OnInit } from '@angular/core';
import { PasaServiceService } from 'src/app/servicios/pasa-service.service';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  pasajero: any;
  misViajes: any [] = [];

  constructor(private pasaS: PasaServiceService) { }

  ngOnInit() {
    this.misViajesRealizados();
    this.pasajero = JSON.parse(localStorage.getItem('sesionIniciada_P'));
  }

  misViajesRealizados(){
    this.pasaS.misViajes(this.pasajero.info.idMatricula).subscribe(
      (result: any) => this.misViajes = result);
  }

}
