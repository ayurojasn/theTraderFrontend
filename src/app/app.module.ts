import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card'; 
import {MatButtonModule} from '@angular/material/button';
import { MainComponent } from './components/main/main.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ShipComponent } from './components/ship/ship.component';
import { HttpClientModule} from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { PlanetsComponent } from './components/planets/planets.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PrincipalComponent,
    ShipComponent,
    PlanetsComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule, 
    MatRadioModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
