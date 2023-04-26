import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { UiService } from 'src/app/shared/ui.service';
import { Observable, Subscription } from 'rxjs';
import * as frRoot from '../../app.reducer'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate:any
  loadingState:Observable<Boolean>
  loadingSub:Subscription
  constructor(private Datepipe:DatePipe , private authData:AuthService, private uiSerivce:UiService,
  private store:Store<frRoot.State>  
  ) { }

  ngOnInit(){
    this.loadingState = this.store.select(frRoot.getIsLoading)
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18)
  }

  onSubmit(form:NgForm){
    var data = form.value
    data.birthday=this.Datepipe.transform(data.birthday, 'yyyy-MM-dd')
    this.authData.registerUser({
      email:data.email,
      password:data.password
    })
  }
  ngOnDestroy(): void {
    if(this.loadingSub){
      this.loadingSub.unsubscribe()

    }
  }

}
