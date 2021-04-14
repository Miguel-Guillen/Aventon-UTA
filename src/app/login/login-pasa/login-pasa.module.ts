import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPasaPageRoutingModule } from './login-pasa-routing.module';

import { LoginPasaPage } from './login-pasa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPasaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginPasaPage]
})
export class LoginPasaPageModule {}
