import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPasaPageRoutingModule } from './menu-pasa-routing.module';

import { MenuPasaPage } from './menu-pasa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPasaPageRoutingModule
  ],
  declarations: [MenuPasaPage]
})
export class MenuPasaPageModule {}
