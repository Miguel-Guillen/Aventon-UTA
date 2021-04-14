import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { reporteModel } from '../../interfaces/reporte.modelo';
import { PasaServiceService } from '../../servicios/pasa-service.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  report: reporteModel = new reporteModel
  reportes: any [] = [];

  reportForm: FormGroup;
  validation_messages = {
    motivo: [
      { type: "required", message: "el motivo es requerido"},
    ],
    ubicacion: [
      { type: "required", message: "la ubicacion es requerida"},
    ],
    descripcion: [
      { type: "required", message: "la descripcion es requerida"},
    ],
    idPasajero: [
      { type: "required", message: "la matricula del pasajero es requerida"},
      { type: "minLenght", message: "matricula minima de 8"}
    ],
    idMatricula: [
      { type: "required", message: "la matricula del conductor es requerida"},
      { type: "minLenght", message: "matricula minima de 6"}
    ],
    placas: [
      { type: "required", message: "las placas del vehiculo son requeridas"},
      { type: "minLenght", message: "placas minima de 10"}
    ]
  }
  
  constructor(private formB: FormBuilder, private route: Router,
    private reportS: PasaServiceService, private alert: AlertController) {
    this.reportForm = this.formB.group({
      motivo: new FormControl("", Validators.required),
      ubicacion: new FormControl("",Validators.required),
      descripcion: new FormControl("", Validators.required),
      idPasajero: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      idMatricula: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),      
      placas: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),
    })
  }

  ngOnInit() {
  }

  reportar(datos) {
    this.reportS.reportar(datos).subscribe(resultado => { 
      if (resultado['resultado']=='OK') {
        console.log(datos)      
        this.alertaRegistro()
        this.route.navigateByUrl('/menu-pasa/home')
      }
      console.log(resultado)    
    }); 
  }

  async alertaRegistro(){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Exito',
      subHeader: '',
      message: 'Reporte realizado',
      buttons: ['OK']
    });
    await alert.present();
  }

}
