import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { PropertyData } from '../models/property.model';

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
