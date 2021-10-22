import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PlanetsComponent } from './components/planets/planets.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ProductsComponent } from './components/products/products.component';
import { ShipComponent } from './components/ship/ship.component';

const routes: Routes = [
  {path: '' , component: MainComponent},
  {path: 'principal/:player', component: PrincipalComponent},
  {path: 'ship/:player/:star', component: ShipComponent},
  {path: 'planets/:player/:star', component: PlanetsComponent},
  {path: 'products/:player/:star/:planet', component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
