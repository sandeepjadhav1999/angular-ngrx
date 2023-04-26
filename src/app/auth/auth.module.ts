import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { authRouting } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
    declarations:[
        LoginComponent,
        SignupComponent,
    ],
    imports:[
        SharedModule,
        ReactiveFormsModule,
        authRouting
    ],
    exports:[]
})
export class AuthModule {}