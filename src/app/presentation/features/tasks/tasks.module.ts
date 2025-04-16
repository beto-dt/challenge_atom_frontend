import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TasksRoutingModule} from '@presentation/features/tasks/tasks-routing.module';
import {TaskListComponent} from '@presentation/features/tasks/components/task-list/task-list.component';
import {TaskItemComponent} from '@presentation/features/tasks/components/task-item/task-item.component';
import {TaskFormComponent} from '@presentation/features/tasks/components/task-form/task-form.component';
import {TaskEditDialog} from '@presentation/features/tasks/dialogs/task-edit/task-edit.dialog';
import {TasksFacade} from '@presentation/features/tasks/tasks.facade';


@NgModule({
  imports: [
    CommonModule,
    TasksRoutingModule,
    TaskListComponent,
    TaskItemComponent,
    TaskFormComponent,
    TaskEditDialog
  ],
  providers: [
    TasksFacade
  ]
})
export class TasksModule { }
