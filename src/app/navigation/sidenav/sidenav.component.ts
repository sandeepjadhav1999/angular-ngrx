import { Component, EventEmitter, OnInit, Output,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output() openingsidenav = new EventEmitter<void>()
  isAuth=false
  authSub:Subscription

  constructor(private authData:AuthService) { }

  ngOnInit(){
    this.authSub =this.authData.authChange.subscribe(authStatus=>{
      this.isAuth=authStatus
    })
  }
  openside(){
    this.openingsidenav.emit()

  }

  logout(){
    this.openside()
    this.authData.logout()
  }
  ngOnDestroy() {
    this.authSub.unsubscribe()
  }
  

}
