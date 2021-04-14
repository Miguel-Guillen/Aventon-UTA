import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
// import { Plugins } from '@capacitor/core';
// const  { Geolocation } = Plugins;
import { PasaServiceService } from '../servicios/pasa-service.service';
import { MapsAPILoader} from '@agm/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { solicitarViaje } from '../interfaces/pasajero.modelo';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {

  pasajero: any;
  perfil: any [] = [];
  misViajes: any [] = []
  matricula: number;
  
  latitud: Number;
  longitud: Number;
  coordinates : any [] = [];

  viaje: solicitarViaje = new solicitarViaje

  geoCoder: any;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  latitude: Number;
  longitude: Number;
  address: String;  
  zoom = 14;

  constructor(private pasaS: PasaServiceService, private actR: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,
    private load: LoadingController, private router: Router) {}

  ngOnInit() {
    this.pasajero = JSON.parse(localStorage.getItem('sesionIniciada_P')); // pasajero.info.email o password
    this.miViaje();

    this.mapsAPILoader.load().then(() => {
      this.getCurrentPosition();
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitud = place.geometry.location.lat();
          this.longitud = place.geometry.location.lng()
        });
      });
    });
  }

  async getCurrentPosition(){ // localizar mi posicion
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 14;
        this.getAddress(this.latitud, this.longitud); // se envian mis cordenadas al metodo
      });
    }
  }

  async getAddress(latitud, longitud) { // asignar mi posicion
    this.viaje.latitudD = latitud;
    this.viaje.longitudD = longitud;
    this.geoCoder.geocode({ 'location': { 
      lat: latitud, 
      lng: longitud
    }}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 14;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status)
        }
    });
  }

  // obtenerPerfil(email){
  //   this.pasaS.perfil(this.email).subscribe((result: any) => this.perfil = result);
  //   console.log(this.email)
  // }

  // watchPosition(){
  //   Geolocation.watchPosition({},position =>{
  //     this.ubicacion = {
  //       lat: position.coords.latitude,
  //       long: position.coords.longitude
  //     };
  //     this.coordinates.push({
  //       lat: position.coords.latitude,
  //       long: position.coords.longitude
  //     });
  //   });
  // }

  viajeD(){
    this.viaje.latitud = this.latitude;
    this.viaje.longitud = this.longitude;
    this.viaje.latitudD = this.latitud;
    this.viaje.longitudD = this.longitud;
    this.viaje.idMatricula = this.pasajero.info.idMatricula
    this.pasaS.solicitarViaje(this.viaje).subscribe(resultado => { 
      console.log(resultado)
      this.presentLoading()
    });
    console.log(this.viaje)
  }

  // cancelarV(){
  //   this.viaje.idMatricula = this.pasajero.info.idMatricula
  //   this.pasaS.cancelarViaje(this.viaje).subscribe(resultado => { 
  //     console.log(resultado)
  //     this.cancelarLoading()
  //     this.router.navigateByUrl('/menu-pasa/home')
  //   });
  // }

  async presentLoading() {
    const loading = await this.load.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere ...',
      duration: 5000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    this.miViaje();
  }

  async cancelarLoading() {
    const loading = await this.load.create({
      cssClass: 'my-custom-class',
      message: 'Cancelando solicitud ...',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    this.miViaje();
  }

  miViaje(){
    this.pasaS.viajeAceptado(this.pasajero.info.idMatricula).subscribe(
      (result: any) => this.misViajes = result);
  }

}
