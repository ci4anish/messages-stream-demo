import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fromASCII'
})
export class FromASCIIPipe implements PipeTransform {

  transform(value: any, type?: string): any {
    if (type !== 'ASCIItext') {
      return value;
    }
    return value.split(' ').map(char => String.fromCharCode((<any>window).parseInt(char, 10))).join('');
  }

}
