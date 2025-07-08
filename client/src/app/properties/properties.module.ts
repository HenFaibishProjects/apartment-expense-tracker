import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../shared/footer/footer.component';
import { NgPipesModule } from 'ngx-pipes';
import { PropertyManagementComponent } from './properties.component';
import { PropertiesCardComponent } from '../properties-card/properties-card.component';
import { PropertyFormModalComponent } from '../property-form-modal/property-form-modal.component';
import { PropertyFilesModalComponent } from '../property-files-modal/property-files-modal.component';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';

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
    PropertyFilesModalComponent,
    MatIcon,
    MatFabButton,

  ],
  exports: [PropertyManagementComponent],
})
export class PropertyManagementModule {}
