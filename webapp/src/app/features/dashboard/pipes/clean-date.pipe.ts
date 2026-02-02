import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({ name: 'cleanDate' })
export class CleanDatePipe implements PipeTransform {
  private locale = 'en-GB';

  transform(value: any, format: string = 'dd/MM/yyyy'): string {
    if (!value) return '';

    let dateObj: Date;

    // Handle Excel serial numbers
    if (typeof value === 'number') {
      dateObj =
        value > 30000 ? new Date(Math.round((value - 25569) * 86400 * 1000)) : new Date(value);
    }
    // Handle DD/MM/YYYY or DD-MM-YY strings
    else if (typeof value === 'string' && (value.includes('/') || value.includes('-'))) {
      const [d, m, y] = value.split(/[\/\-]/).map(Number);
      const fullYear = y < 100 ? (y < 50 ? 2000 + y : 1900 + y) : y;
      dateObj = new Date(fullYear, m - 1, d);
    }
    // Handle ISO strings and other formats
    else {
      dateObj = new Date(value);
    }

    if (isNaN(dateObj.getTime())) return value;

    return formatDate(dateObj, format, this.locale);
  }
}
