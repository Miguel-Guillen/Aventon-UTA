import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { reporteModel } from '../../interfaces/reporte.modelo';
import { AdminServiceService } from '../../servicios/admin-service.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  idReporte: Number;
  report: reporteModel = new reporteModel;
  reportes: any [] = [];

  reportForm: FormGroup;
  validation_messages = {
    idReporte: [
      { type: "required", message: "error"},
    ],
    motivo: [
      { type: "required", message: "el motivo es requerido"},
    ],
    fecha: [
      { type: "required", message: "la fecha es requerida"},
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

  constructor(private formB: FormBuilder, private router: Router,
    private alert: AlertController, private adminS: AdminServiceService,
    private route: ActivatedRoute) {

      this.reportForm = this.formB.group({
        idReporte: new FormControl("", Validators.required),
        motivo: new FormControl("", Validators.required),
        fecha: new FormControl("", Validators.required),
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
    this.idReporte = + this.route.snapshot.paramMap.get("idReporte");
    this.adminS.selectReporte(this.idReporte).subscribe((result: any) => this.reportes = result);
  }

  async eliminar(idReporte){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: '¿Esta seguro?',
      message: '¿Desea borrar el reporte?',
      buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {}
      }, 
      {
        text: 'Borrar',
        handler: () => {
          this.adminS.borrarReporte(idReporte).subscribe(datos => {
            if (datos['resultado']=='OK') {
              console.log(datos)
              this.adminS.buscarReporte();
              this.router.navigateByUrl('/menu/home');
              this.alerta();
            }
          });
        }
      }
    ]
    });
    await alert.present();
  }

  async alerta(){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Conseguido',
      subHeader: '',
      message: 'El reporte fue eliminado con exito',
      buttons: ['OK']
    });
    await alert.present();
  }
}
