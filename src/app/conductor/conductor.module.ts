import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { IonicModule } from '@ionic/angular';
import { ConductorPageRoutingModule } from './conductor-routing.module';
import { ConductorPage } from './conductor.page';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConductorPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsKeyApi,
      libraries: ['places']
    })
  ],
  declarations: [ConductorPage]
})
export class ConductorPageModule {}
