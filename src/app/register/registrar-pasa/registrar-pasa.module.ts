import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegistrarPasaPageRoutingModule } from './registrar-pasa-routing.module';

import { RegistrarPasaPage } from './registrar-pasa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarPasaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistrarPasaPage]
})
export class RegistrarPasaPageModule {}
