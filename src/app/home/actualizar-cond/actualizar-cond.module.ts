import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarCondPageRoutingModule } from './actualizar-cond-routing.module';

import { ActualizarCondPage } from './actualizar-cond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarCondPageRoutingModule
  ],
  declarations: [ActualizarCondPage]
})
export class ActualizarCondPageModule {}
