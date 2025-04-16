import { Injectable } from '@angular/core';

import { UserDto } from '../dtos/user.dto';
import {User} from '../../domain/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserMapper {
  fromDto(dto: UserDto): User {
    if (!dto) {
      return null as any;
    }

    return {
      id: dto.id,
      email: dto.email,
      createdAt: dto.createdAt ? new Date(dto.createdAt) : new Date()
    };
  }

  toDto(model: User): UserDto {
    if (!model) {
      return null as any;
    }

    return {
      id: model.id,
      email: model.email,
      createdAt: model.createdAt instanceof Date
        ? model.createdAt.toISOString()
        : model.createdAt
    };
  }

  fromDtoList(dtos: UserDto[]): User[] {
    if (!dtos || !Array.isArray(dtos)) {
      return [];
    }

    return dtos.map(dto => this.fromDto(dto));
  }

  toDtoList(models: User[]): UserDto[] {
    if (!models || !Array.isArray(models)) {
      return [];
    }

    return models.map(model => this.toDto(model));
  }
}
