import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cleanNumber' })
export class CleanNumberPipe implements PipeTransform {
  transform(value: any): number | null {
    if (value === null || value === undefined || value === '') return null;

    // Handle Date objects
    if (value instanceof Date) {
      const ts = value.getTime();
      return isNaN(ts) ? null : ts;
    }

    // Handle numeric strings or numbers
    if (typeof value === 'number' || (!isNaN(value) && !isNaN(parseFloat(value)))) {
      return Number(value);
    }

    // Handle date-like strings
    if (typeof value === 'string') {
      let ts = Date.parse(value);

      // Fallback for DD/MM/YYYY
      if (isNaN(ts)) {
        ts = Date.parse(this.standardize(value));
      }

      if (!isNaN(ts)) return ts;
    }

    return null;
  }

  private standardize(val: string): string {
    const parts = val.split(/[\/\- ]/);
    if (parts.length >= 3 && parts[0].length <= 2) {
      return `${parts[1]}/${parts[0]}/${parts[2]}`;
    }
    return val;
  }
}
