import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'actualizar/:idMatricula',
    loadChildren: () => import('./actualizarPasa/actualizar.module').then( m => m.ActualizarPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'actualizarUser/:idMatricula',
    loadChildren: () => import('./actualizar-user/actualizar-user.module').then( m => m.ActualizarUserPageModule)
  },
  {
    path: 'reportes/:idReporte',
    loadChildren: () => import('./reportes/reportes.module').then( m => m.ReportesPageModule)
  },
  {
    path: 'acercade',
    loadChildren: () => import('./acercade/acercade.module').then( m => m.AcercadePageModule)
  },
  {
    path: 'actualizar-cond',
    loadChildren: () => import('./actualizar-cond/actualizar-cond.module').then( m => m.ActualizarCondPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
