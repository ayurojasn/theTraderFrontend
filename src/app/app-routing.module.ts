import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ShipComponent } from './components/ship/ship.component';

const routes: Routes = [
  {path: '' , component: MainComponent},
  {path: 'principal', component: PrincipalComponent},
  {path: 'ship', component: ShipComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
