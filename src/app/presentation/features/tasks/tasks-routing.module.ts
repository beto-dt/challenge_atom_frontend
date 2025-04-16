import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/authentication/guards/auth.guard';
import {TaskListComponent} from '@presentation/features/tasks/components/task-list/task-list.component';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
    canActivate: [AuthGuard],
    title: 'Mis Tareas'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
