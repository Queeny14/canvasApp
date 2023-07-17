import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FieldSelectionComponent } from './field-selection/field-selection.component';
import { StylingOptionsComponent } from './styling-options/styling-options.component';
import { PdfCustomizationComponent } from './pdf-customizer/pdf-customizer.component';


@NgModule({
  declarations: [
    AppComponent,
    FieldSelectionComponent,
    StylingOptionsComponent,
    PdfCustomizationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
