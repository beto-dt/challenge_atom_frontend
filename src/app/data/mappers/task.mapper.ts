import { Injectable } from '@angular/core';
import { Task } from '@domain/models/task.model';
import {TaskDto} from '@data/dtos/task.dto';

@Injectable({
  providedIn: 'root'
})
export class TaskMapper {
  fromDto(dto: TaskDto): Task {
    return {
      id: dto.id,
      userId: dto.userId,
      title: dto.title,
      description: dto.description,
      completed: dto.completed,
      createdAt: new Date(dto.createdAt)
    };
  }

  toDto(model: Task): TaskDto {
    return {
      id: model.id,
      userId: model.userId,
      title: model.title,
      description: model.description,
      completed: model.completed,
      createdAt: model.createdAt?.toISOString() ?? new Date().toISOString()
    };
  }
}
