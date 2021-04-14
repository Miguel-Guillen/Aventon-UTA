import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../servicios/admin-service.service';
import { PasaServiceService } from '../servicios/pasa-service.service';
import { ConductorSService } from '../servicios/conductor-s.service'
import { AlertController, IonSlides } from '@ionic/angular';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
 templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonSlides) slides : IonSlides

  slideOpts = {
    initialSlide: 0,
    speed: 550
  };

  users: any [] = [];
  pasajeros: any [] = [];
  conductores: any [] = [];
  perfil: String;
  reportes: any [] = [];

  constructor(private userService: AdminServiceService, private pasaS: PasaServiceService,
    private alert: AlertController, private condS: ConductorSService,
    private route: Router) {
    }

  async ngOnInit() {
    await this.returnUser();
    await this.returnPasajero();
    await this.returnReportes();
    await this.returnConductor();
  }

  returnUser(){
    this.userService.recuperar().subscribe((result: any) => this.users = result);
  }

  returnPasajero(){
    this.pasaS.recuperar().subscribe((result: any) => this.pasajeros = result);
  }

  returnConductor(){
    this.condS.recuperar().subscribe((result: any) => this.conductores = result);
  }

  returnReportes(){
    this.userService.buscarReporte().subscribe((result: any) => this.reportes = result);
  }

  goToSlide(){
    this.slides.slideTo(1,550);
  }

  goToSlide2(){
    this.slides.slideTo(2,550);
  }

  async eliminar(idMatricula){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: 'Borrar Usuario',
      message: '¿Desea borrar el usuario ' +idMatricula+'?',
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
          this.userService.eliminar(idMatricula).subscribe(datos => {
            if (datos['resultado']=='OK') {
              this.returnUser();
              this.alerta2()
            }
          });          
        }
      }
    ]
    });
    await alert.present();
  }

  async eliminarPasa(idMatricula){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: 'Borrar Pasajero',
      message: '¿Desea borrar el pasajero ' +idMatricula+'?',
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
          this.pasaS.eliminar(idMatricula).subscribe(datos => {
            if (datos['resultado']=='OK') {
              this.alerta3();
              this.returnPasajero();
            }
          });
        }
      }
    ]
    });
    await alert.present();
  }

  async eliminarCond(idMatricula){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: '¿Esta seguro?',
      message: '¿Desea borrar el conductor ' +idMatricula+'?',
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
          this.condS.borrar(idMatricula).subscribe(datos => {
            if (datos['resultado']=='OK') {
              this.alerta4();
              this.returnConductor();
            }
          });
        }
      }
    ]
    });
    await alert.present();
  }

  async alerta2(){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Exito',
      subHeader: '',
      message: 'Usuario eliminado con exito',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alerta3(){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Exito',
      subHeader: '',
      message: 'Pasajero eliminado con exito',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alerta4(){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Exito',
      subHeader: '',
      message: 'Conductor eliminado con exito',
      buttons: ['OK']
    });
    await alert.present();
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
