import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGurd } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { TrainingComponent } from './training/training.component';

const routes: Routes = [
  {path:"", component:HomeComponent },
  {path:"home", component:HomeComponent},
  {path:"training", loadChildren: ()=>import('./training/training.module').then(m=>m.TrainingModule), canLoad:[AuthGurd]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGurd]

})
export class AppRoutingModule { }
