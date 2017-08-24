import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:"lastSubstr"})

export class LastSubstrPipe implements PipeTransform{
    transform(value: string, exponent: number):string {
        let exp = exponent;
        let len=value.length;
        return value.substr(0,len-exp);
      }
}