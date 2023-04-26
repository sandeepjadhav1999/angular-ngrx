import { Component,  OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import * as frApp from '../../app.reducer'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup
  loadingState:Observable<boolean>
  loadingSub:Subscription

  constructor(private authData:AuthService,private uiService:UiService,
    private store:Store<{ui:frApp.State}>
    ) { }

  ngOnInit(){
    this.loadingState=this.store.select(frApp.getIsLoading)
    // this.loadingSub=this.uiService.loadingState.subscribe(res=>{
    //   this.loadingState=res
    // })

    this.loginForm = new FormGroup({
      email : new FormControl("", [Validators.required, Validators.email]),
      password : new FormControl("", [Validators.required])
    })
  }

  onSubmit(){
    this.authData.login({
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    })
  }
  // ngOnDestroy(): void {
  //   if(this.loadingSub){
  //     this.loadingSub.unsubscribe()
  //   }
  // }
}
