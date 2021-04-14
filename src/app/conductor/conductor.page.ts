import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ConductorSService } from '../servicios/conductor-s.service';
const  { Geolocation } = Plugins;
import { MapsAPILoader} from '@agm/core';
import { viajeAceptarModel, viajeModel } from '../interfaces/pasajero.modelo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {
  geoCoder: any;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  latitude: Number;
  longitude: Number;
  address: String;  
  zoom = 13;

  nombre = "Miguel Angel";
  placas = "24XlO9"
  conductor: any;
  latitud: Number;
  longitud: Number;
  viajes: any [] = [];
  solicitud: any [] = [];
  
  viajeA: viajeAceptarModel = new viajeAceptarModel;
  viajeT: viajeModel = new viajeModel;

  constructor(private condS: ConductorSService, private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader, private route: Router) { }

  ngOnInit() {
    this.conductor = JSON.parse(localStorage.getItem('sesionIniciada_C'));
    this.solicitudes();
    this.viajeProceso();

    this.mapsAPILoader.load().then(() => {
      this.getCurrentPosition();
      this.geoCoder = new google.maps.Geocoder;
      // let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      // autocomplete.addListener("place_changed", () => {
      //   this.ngZone.run(() => {
      //     let place: google.maps.places.PlaceResult = autocomplete.getPlace();
      //     if (place.geometry === undefined || place.geometry === null) {
      //       return;
      //     }
      //     this.latitude = place.geometry.location.lat();
      //     this.longitude = place.geometry.location.lng()
      //   });  
      // });
    });
  }

  aceptar(latitud, longitud, idMatricula){
    this.latitud = latitud;
    this.longitud = longitud;
    this.getAddress(this.longitud, this.latitud);
    this.viajeA.latitud = latitud;
    this.viajeA.longitud = longitud;
    this.viajeA.estado = 1;
    this.viajeA.idMatricula = idMatricula;
    this.viajeA.nombre = this.nombre;
    this.viajeA.placas = this.placas;
    this.viajeA.idConductor = this.conductor.info.idMatricula;
    this.condS.aceptarViaje(this.viajeA).subscribe(resultado => { 
      if (resultado['resultado']=='OK') {
        console.log(resultado)      
        this.solicitudes();
        this.viajeProceso();
      }
    }); 
  }

  cancelar(i){
    this.viajes.splice(i,1);
  }

  terminar(latitudD, longitudD, idMatricula){
    this.viajeT.latitudD = latitudD;
    this.viajeT.longitudD = longitudD;
    this.viajeT.estado = 3;
    this.viajeT.idMatricula = idMatricula;
    this.condS.terminarViaje(this.viajeT).subscribe(resultado => { 
      if (resultado['resultado']=='OK') {
        console.log(resultado)      
        this.viajeProceso();
        this.solicitudes();
        this.route.navigateByUrl('/menu-conductor/home');
      }
    });
  }

  finalizar(latitudD, longitudD, idMatricula){
    this.viajeT.latitudD = latitudD;
    this.viajeT.longitudD = longitudD;
    this.viajeT.estado = 2;
    this.viajeT.idMatricula = idMatricula;
    this.condS.finalizarViaje(this.viajeT).subscribe(resultado => { 
      if (resultado['resultado']=='OK') {
        console.log(resultado)      
        this.viajeProceso();
        this.solicitudes();
        this.route.navigateByUrl('/menu-conductor/home');
      }
    });
  }

  async getCurrentPosition(){ // localizar mi posicion
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 14;
        this.latitud = position.coords.latitude;
        this.longitud = position.coords.longitude;
        this.getAddress(this.latitud, this.longitud); // se envian mis cordenadas al metodo
      });
    }
  }

  async getAddress(latitud, longitud) { // asignar mi posicion
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

  solicitudes(){
    this.condS.solicitud().subscribe((result: any) => this.viajes = result);
  }

  viajeProceso(){
    this.condS.viajesAceptado().subscribe((result: any) => this.solicitud = result);
  }
}
