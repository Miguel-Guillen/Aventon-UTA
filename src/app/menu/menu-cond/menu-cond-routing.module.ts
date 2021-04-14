import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuCondPage } from './menu-cond.page';

const routes: Routes = [
  {
    path: '',
    component: MenuCondPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../conductor/conductor.module').then( m => m.ConductorPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuCondPageRoutingModule {}
