import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'cleanDate' })
export class CleanDatePipe implements PipeTransform {
  private angularDatePipe = new DatePipe('en-GB');

  transform(value: any, format: string = 'dd/MM/yyyy'): string {
    if (value === null || value === undefined || value === '') return '';

    let dateObj: Date;

    if (typeof value === 'number' || (!isNaN(value) && !isNaN(parseFloat(value)))) {
      dateObj = new Date(Number(value));
    } else {
      let timestamp = Date.parse(value);

      if (isNaN(timestamp) && typeof value === 'string') {
        timestamp = Date.parse(this.attemptStandardize(value));
      }

      dateObj = new Date(timestamp);
    }

    if (isNaN(dateObj.getTime())) {
      return '';
    }

    return this.angularDatePipe.transform(dateObj, format) || '';
  }

  private attemptStandardize(val: string): string {
    const parts = val.split(/[\/\- ]/);
    if (parts.length >= 3 && parts[0].length <= 2) {
      return `${parts[1]}/${parts[0]}/${parts[2]}`;
    }
    return val;
  }
}
