import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../shared/footer/footer.component';
import { NgPipesModule } from 'ngx-pipes';
import { PropertyManagementComponent } from './properties.component';
import { PropertiesCardComponent } from '../properties-card/properties-card.component';
import { PropertyFormModalComponent } from '../property-form-modal/property-form-modal.component';

@NgModule({
  declarations: [PropertyManagementComponent],
  imports: [
    NgPipesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FooterComponent,
    PropertiesCardComponent,
    PropertyFormModalComponent,

  ],
  exports: [PropertyManagementComponent],
})
export class PropertyManagementModule {}
