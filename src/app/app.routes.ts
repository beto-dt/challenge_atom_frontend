import { Routes } from '@angular/router';
import {AuthGuard} from '@core/authentication/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./presentation/features/auth/auth.module').then(m => m.AuthModule),
    title: 'Iniciar Sesión'
  },
  {
    path: 'tasks',
    loadChildren: () => import('./presentation/features/tasks/tasks.module').then(m => m.TasksModule),
    canActivate: [AuthGuard],
    title: 'Mis Tareas'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
