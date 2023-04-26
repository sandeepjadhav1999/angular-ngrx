import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from '../training/trainig.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as frRoot from '../app.reducer'
import * as UI from '../shared/ui.actions'


@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private authuser= false
  currentUserName:string


  constructor(private route:Router ,
    private afAuth:AngularFireAuth, 
    private trainingService:TrainingService,
    private snackBar:MatSnackBar,
    private uiService:UiService,
    private store:Store<{ui:frRoot.State}>){}

  registerUser(authData: AuthData) {
    // this.uiService.loadingState.next(true)
    this.store.dispatch(new UI.StartLoading())
    this.afAuth.createUserWithEmailAndPassword(authData.email,authData.password)
    .then(res=>{
      // this.uiService.loadingState.next(false)
      this.store.dispatch(new UI.StopLoading())

    })
    .catch(error=>{
      // this.uiService.loadingState.next(false)
      this.store.dispatch(new UI.StopLoading())
      this.uiService.snackBarMsg(error.message,null,3000)
      
    })
    
  }

  login(authData: AuthData) {
    // this.uiService.loadingState.next(true)
    this.store.dispatch(new UI.StartLoading())
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then((res)=>{
      // this.uiService.loadingState.next(false)
      this.store.dispatch(new UI.StopLoading())

    })
    .catch((error)=>{
      // this.uiService.loadingState.next(false)
      this.store.dispatch(new UI.StopLoading())
      this.uiService.snackBarMsg(error.message,null,3000)
    })
  }

  logout() {
    this.afAuth.signOut()
    
  }


  isAuth() {
    return this.authuser;
  }

  inauthSccussfull(){
    this.afAuth.authState.subscribe(
      user=>{
        if (user){
          this.authuser=true
          this.authChange.next(true);
          this.route.navigate(['/training'])
        }else
        {
          this.trainingService.cancelSub()
          this.authuser=false
          this.currentUserName=null
          this.authChange.next(false);
          this.route.navigate(['/home'])
        }
      }
    )
  }
}
