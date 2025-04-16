import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  private datePipe = new DatePipe('es-ES');

  transform(value: Date | string | number, format: string = 'mediumDate'): string {
    if (!value) {
      return '';
    }

    if (format === 'timeAgo') {
      return this.getTimeAgo(new Date(value));
    }

    return this.datePipe.transform(value, format) || '';
  }

  private getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days === 1 ? 'hace 1 día' : `hace ${days} días`;
    }
    if (hours > 0) {
      return hours === 1 ? 'hace 1 hora' : `hace ${hours} horas`;
    }
    if (minutes > 0) {
      return minutes === 1 ? 'hace 1 minuto' : `hace ${minutes} minutos`;
    }
    return 'hace un momento';
  }
}
