import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthGurd implements CanActivate ,CanLoad{
    constructor( private auth:AuthService, private route:Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.auth.isAuth()){
            return true
        }else{
            this.route.navigate(['/home'])
        }
        
    }

    canLoad(route: Route){
        if(this.auth.isAuth()){
            return true
        }else{
            this.route.navigate(['/home'])
        }
    }
}