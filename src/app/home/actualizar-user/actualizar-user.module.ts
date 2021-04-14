import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ActualizarUserPageRoutingModule } from './actualizar-user-routing.module';

import { ActualizarUserPage } from './actualizar-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarUserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ActualizarUserPage]
})
export class ActualizarUserPageModule {}
