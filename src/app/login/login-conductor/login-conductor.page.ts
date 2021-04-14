import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConductorSService } from '../../servicios/conductor-s.service';

@Component({
  selector: 'app-login-conductor',
  templateUrl: './login-conductor.page.html',
  styleUrls: ['./login-conductor.page.scss'],
})
export class LoginConductorPage implements OnInit {

  conductores: any [] = [];

  loginForm: FormGroup;
  validation_messages = {
      email: [
        { type: "required", message: "el email es requerido"},
        { type: "pattern", message: "el email ingresado es invalido"}
      ],
      idMatricula: [
        { type: "required", message: "la matricula es requerida"},
        { type: "minLenght", message: "matricula minima de 6"}
      ],
      password: [
        { type: "required", message: "la contraseña es requerida"},
        { type: "minLenght", message: "contraseña minima 8"}
      ]
  }

  constructor(private alert: AlertController, private router: Router,
    private condS: ConductorSService, private formB: FormBuilder) { 

      this.loginForm = this.formB.group({
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
    this.condS.login(credenciales).subscribe((datos: any) => {
      if (datos['resultado']=='OK') {
        let conductor: NavigationExtras = {
          queryParams:{
            info: credenciales
          } 
        }
        let infoUser = {
          info: credenciales
        }
        localStorage.setItem('sesionIniciada_C',JSON.stringify(infoUser))
        this.conductores = infoUser.info
        this.router.navigate(['menu-conductor/home'], conductor)
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
