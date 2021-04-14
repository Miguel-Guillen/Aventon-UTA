import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPasaPage } from './login-pasa.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPasaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPasaPageRoutingModule {}
