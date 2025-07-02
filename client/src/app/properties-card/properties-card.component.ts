import { Component, Input } from '@angular/core';
import { PropertyData } from '../properties/properties.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-properties-card',
  templateUrl: './properties-card.component.html',
  imports: [
    NgIf,
  ],
  styleUrls: ['./properties-card.component.css'],
})
export class PropertiesCardComponent {
  @Input() property!: PropertyData;
  @Input() section!: string;
}
