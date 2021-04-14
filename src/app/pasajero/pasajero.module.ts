import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { IonicModule } from '@ionic/angular';
import { PasajeroPageRoutingModule } from './pasajero-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasajeroPage } from './pasajero.page';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasajeroPageRoutingModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsKeyApi,
      libraries: ['places']
    })
  ],
  declarations: [PasajeroPage]
})
export class PasajeroPageModule {}
