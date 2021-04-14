import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarCondPage } from './actualizar-cond.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarCondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarCondPageRoutingModule {}
