
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform{
    transform(value: string) {
        return value.replace(/([A-Z])/g, ' $1').trim();
    }
}