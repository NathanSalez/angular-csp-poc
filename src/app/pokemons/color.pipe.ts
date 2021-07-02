import {Pipe, PipeTransform} from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Pipe({
  name: 'color'
})
export class ColorPipe implements PipeTransform {
  // 'primary' | 'accent' | 'warn' | undefined;
  typesColors = [
    {types: ['Eau', 'Plante', 'Insecte', 'Vol', 'Glace'], color: 'accent'},
    {types: ['Feu'], color: 'warn'},
    {types: ['Poison'], color: 'primary'},
    {types: ['Normal'], color: 'secondary'},
  ];

  transform(type: string): ThemePalette {
    const key = this.typesColors.find((v) => v.types.includes(type, 0));
    if (key) {
      return key.color as ThemePalette;
    } else {
      return 'primary' as ThemePalette;
    }
  }
}
