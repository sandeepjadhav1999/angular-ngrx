import { Component, EventEmitter, OnInit, Output ,OnDestroy} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavTogglee = new EventEmitter<void>()
  isAuth=false
  authSub:Subscription

  constructor(private authData:AuthService ,public auth:AuthService) { }

  ngOnInit(){
    this.authSub =this.authData.authChange.subscribe(authStatus=>{
      this.isAuth=authStatus
    })
  }

  onsidenavToggle(){
    this.sidenavTogglee.emit()

  }

  logOut(){
    this.authData.logout()
  }
  ngOnDestroy() {
    this.authSub.unsubscribe()
  }
  

}
