import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelTitle } from '@angular/material/expansion';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FooterComponent,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
  ],
  exports: [LoginComponent],
})
export class LoginModule {}
