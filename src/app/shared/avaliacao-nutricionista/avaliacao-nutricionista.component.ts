import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avaliacao-nutricionista',
  templateUrl: './avaliacao-nutricionista.component.html',
  styleUrls: ['./avaliacao-nutricionista.component.scss']
})
export class AvaliacaoNutricionistaComponent {

  @Input() avaliacao!: number;

  constructor() {}

}