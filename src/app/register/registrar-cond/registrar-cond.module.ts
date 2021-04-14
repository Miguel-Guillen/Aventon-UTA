import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarCondPageRoutingModule } from './registrar-cond-routing.module';

import { RegistrarCondPage } from './registrar-cond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarCondPageRoutingModule
  ],
  declarations: [RegistrarCondPage]
})
export class RegistrarCondPageModule {}
