import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasaServiceService } from '../../servicios/pasa-service.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { pasajeroModel } from '../../interfaces/pasajero.modelo';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {
  
  idMatricula: Number;
  pasajeros: any [] = [];
  pasa: pasajeroModel = new pasajeroModel;

  actualizarForm: FormGroup;
  validation_messages = {
    nombre: [
      { type: "required", message: "el nombre es requerido"},
    ],
    celular: [
      { type: "required", message: "el celular es requerido"},
      { type: "minLenght", message: "longitud minima de 10 numeros"}
    ],
    curp: [
      { type: "minLenght", message: "curp minima de 16 caracteres"},
      { type: "pattern", message: "curp ingresada invalida"}
    ],
    email: [
      { type: "required", message: "el email es requerido"},
      { type: "pattern", message: "el email ingresado es invalido"}
    ],
    password: [
      { type: "required", message: "la contraseña es requerida"},
      { type: "minLenght", message: "contraseña minima 8"}
    ],
    idMatricula: [
      { type: "required", message: "la matricula es requerida"},
      { type: "minLenght", message: "maticula minima de 6"}
    ]
  }

  constructor(private router: Router, private route: ActivatedRoute, 
    private alert: AlertController, private pasaS: PasaServiceService, 
    private formB: FormBuilder) {
      
      this.actualizarForm = this.formB.group({
        nombre: new FormControl("", Validators.compose([
          Validators.required,
        ])),
        celular: new FormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(10)
        ])),
        curp: new FormControl("", Validators.compose([
          Validators.minLength(16),
          Validators.pattern("^[a-zA-Z-]+[0-9-]+[a-zA-Z-]+[0-9-]$")
        ])),
        email: new FormControl("", Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])),
        password: new FormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])),
        idMatricula: new FormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])),
      })
     }

  ngOnInit() {
    this.idMatricula = + this.route.snapshot.paramMap.get("idMatricula")
    this.pasaS.select(this.idMatricula).subscribe((result: any) => this.pasajeros = result);
  }

  modificar(datos) {
    this.pasaS.modificar(datos).subscribe(resultado => {
      if (resultado['resultado']=='OK') {
        this.alertActualizar()
        this.returnPasajero()
        this.actualizarForm.reset()
        this.router.navigateByUrl('menu/home')
      }
    });
  }

  returnPasajero(){
    this.pasaS.recuperar().subscribe((result: any) => this.pasajeros = result);
  }

  async alertActualizar(){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Exito',
      subHeader: '',
      message: 'Pasajero actualizado',
      buttons: ['OK']
    });
    await alert.present();
  }

}
