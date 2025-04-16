import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from '@presentation/features/auth/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Iniciar Sesión'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
