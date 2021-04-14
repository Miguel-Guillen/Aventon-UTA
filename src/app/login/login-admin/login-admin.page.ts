import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AdminServiceService } from '../../servicios/admin-service.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.page.html',
  styleUrls: ['./login-admin.page.scss'],
})
export class LoginAdminPage implements OnInit {
  users: any [] = [];

  loginForm: FormGroup;
  validation_messages = {
      email: [
        { type: "required", message: "el email es requerido"},
        { type: "pattern", message: "el email ingresado es invalido"}
      ],
      password: [
        { type: "required", message: "la contraseña es requerida"},
        { type: "minLenght", message: "contraseña minima 8"}
      ]
  }

  constructor(private formBuilder: FormBuilder, private route: Router,
    private adminS: AdminServiceService, private alert: AlertController) { 
      this.loginForm = this.formBuilder.group({
        email: new FormControl("", Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])),
        password: new FormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])),
      })
    }

  ngOnInit() {
  }

  login(credenciales){
    this.adminS.login(credenciales).subscribe(datos => {
      if (datos['resultado']=='OK') {
        let usuario: NavigationExtras = {
          queryParams:{
            info: credenciales
          }
        }
        let infoUser = {
          info: credenciales,
        }
        localStorage.setItem('sesionIniciada',JSON.stringify(infoUser))
        this.users = infoUser.info
        this.route.navigate(['menu/home'],usuario)
      }
      if (datos['error']=='Error') {
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
