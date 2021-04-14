import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarUserPage } from './actualizar-user.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarUserPageRoutingModule {}
