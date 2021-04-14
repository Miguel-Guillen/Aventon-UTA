import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasaServiceService } from '../../servicios/pasa-service.service';
import { AlertController } from '@ionic/angular';
import { pasajeroModel } from '../../interfaces/pasajero.modelo';

@Component({
  selector: 'app-registrar-pasa',
  templateUrl: './registrar-pasa.page.html',
  styleUrls: ['./registrar-pasa.page.scss'],
})
export class RegistrarPasaPage implements OnInit {

  pasajero: pasajeroModel = new pasajeroModel
  pasa: any [] = [];

  registerForm: FormGroup;
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

  constructor(private router: Router, private pasaS: PasaServiceService,
    private alert: AlertController, private formBuilder: FormBuilder) {

      this.registerForm = this.formBuilder.group({
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
  }

  register(datos) {
    this.pasaS.registro(datos).subscribe(resultado => { 
      if (resultado['resultado']=='OK') {
        console.log(datos)      
        this.alertaRegistro()
        this.returnUser()
        this.router.navigateByUrl('/login-pasa')
      }
      if (datos['resultado']=='Error') {
        this.alertError()
      }
      console.log(resultado)    
    }); 
  }

  returnUser(){
    this.pasaS.recuperar().subscribe((result: any) => {
      this.pasa = (result.pasajero)
    });
  }

  async alertaRegistro(){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Exito',
      subHeader: '',
      message: 'Datos registrados correctamente',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertError(){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: '',
      message: 'Email o password incorrecto',
      buttons: ['OK']
    });
    await alert.present();
  }

}
