import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../../servicios/admin-service.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { userModel } from '../../interfaces/user.modelo';

@Component({
  selector: 'app-actualizar-user',
  templateUrl: './actualizar-user.page.html',
  styleUrls: ['./actualizar-user.page.scss'],
})

export class ActualizarUserPage implements OnInit {

  users: any [] = [];
  user: userModel = new userModel;  
  idMatricula: Number;

  actualizarForm: FormGroup;
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

  constructor(private userService: AdminServiceService, private router: Router,
    private route: ActivatedRoute, private alert: AlertController,
    private formB: FormBuilder) { 

      this.actualizarForm = this.formB.group({
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
    this.idMatricula = + this.route.snapshot.paramMap.get("idMatricula")
    this.userService.select(this.idMatricula).subscribe((result: any) => this.users = result);
  }

  modificar(datos) {
    this.userService.modificarUser(datos).subscribe(resultado => {
      if (resultado['resultado']=='OK') {
        this.alertActualizar()
        this.actualizarForm.reset()
        this.returnUser()
        this.router.navigateByUrl('menu/home')
      }
    });
  }

  returnUser(){
    this.userService.recuperar().subscribe((result: any) => this.users = result);
  }

  async alertActualizar(){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Exito',
      subHeader: '',
      message: 'Usuario actualizado',
      buttons: ['OK']
    });
    this.router.navigateByUrl('menu/home')
    await alert.present();
  }
}
