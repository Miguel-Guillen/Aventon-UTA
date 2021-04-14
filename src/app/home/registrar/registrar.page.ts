import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../servicios/admin-service.service';
import { AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import { userModel } from '../../interfaces/user.modelo';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  
  users: any [] = [];
  user: userModel = new userModel;

  registrarForm: FormGroup;
  validation_messages = {
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
        { type: "minLenght", message: "matricula minima de 6 numeros"}
      ]
  }

  constructor(private userService: AdminServiceService, 
    private alert: AlertController, private router: Router,
    private formB: FormBuilder) {

      this.registrarForm = this.formB.group({
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
        ]))
      })
     }

  ngOnInit() {
  }

  register(datos) {
    this.userService.registro(datos).subscribe(resultado => { 
      if (resultado['resultado']=='OK') {
        console.log(resultado);      
        this.alertaRegistro();
        this.registrarForm.reset()
        this.returnUser();
      }
    }); 
  }

  returnUser(){
    this.userService.recuperar().subscribe((result: any) => this.users = result);
  }

  async alertaRegistro(){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Exito',
      subHeader: '',
      message: 'Usuario registrado',
      buttons: ['OK']
    });
    await alert.present();
  }

}
