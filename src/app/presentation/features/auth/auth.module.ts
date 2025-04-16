import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRoutingModule} from '@presentation/features/auth/auth-routing.module';
import {LoginComponent} from '@presentation/features/auth/components/login/login.component';
import {UserCreationDialog} from '@presentation/features/auth/dialogs/user-creation/user-creation.dialog';
import {AuthFacade} from '@presentation/features/auth/auth.facade';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    LoginComponent,
    UserCreationDialog
  ],
  providers: [
    AuthFacade
  ]
})
export class AuthModule { }
