import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController} from '@ionic/angular';
import { PasaServiceService } from '../../servicios/pasa-service.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login-pasa',
  templateUrl: './login-pasa.page.html',
  styleUrls: ['./login-pasa.page.scss'],
})
export class LoginPasaPage implements OnInit {

  pasajeros: any [] = [];

  loginForm: FormGroup;
  validation_messages = {
      email: [
        { type: "required", message: "el email es requerido"},
        { type: "pattern", message: "el email ingresado es invalido"}
      ],
      password: [
        { type: "required", message: "la contraseña es requerida"},
        { type: "minLenght", message: "contraseña minima de 8"}
      ],
      idMatricula: [
        { type: "required", message: "la matricula es requerida"},
        { type: "minLenght", message: "matricula minima de 6"}
      ]
  }

  constructor(private formBuilder: FormBuilder, private pasaS: PasaServiceService,
    private router: Router, private alert: AlertController) { 
      this.loginForm = this.formBuilder.group({
        email: new FormControl("", Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9.]+$")
        ])),
        password: new FormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])),
        idMatricula: new FormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ]))
      })
    }

  ngOnInit() {
  }
  
  login(credenciales){
    this.pasaS.login(credenciales).subscribe((datos: any) => {
      if (datos['resultado']=='OK') {
        let pasajero: NavigationExtras = {
          queryParams:{
            info: credenciales
          } 
        }
        let infoUser = {
          info: credenciales
        }
        localStorage.setItem('sesionIniciada_P',JSON.stringify(infoUser))
        this.pasajeros = infoUser.info
        this.router.navigate(['menu-pasa/home'], pasajero)
      }
      if (datos['resultado']=='Error') {
        this.alertaError()
      }
      console.log(datos)
    })
  }

  async alertaError(){
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
