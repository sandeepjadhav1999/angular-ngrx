import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGurd } from "../auth/auth.guard";
import { TrainingComponent } from "./training.component";

const routes:Routes=[
    {path:"", component:TrainingComponent},
]


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[]
})
export class TraningRoute{}