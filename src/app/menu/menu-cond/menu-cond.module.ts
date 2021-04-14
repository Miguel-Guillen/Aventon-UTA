import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuCondPageRoutingModule } from './menu-cond-routing.module';

import { MenuCondPage } from './menu-cond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuCondPageRoutingModule
  ],
  declarations: [MenuCondPage]
})
export class MenuCondPageModule {}
