import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    user: any = {
      email:null,
      password: null,
      confirm_password: null,
    }
  constructor() { }

  ngOnInit() {
  }


  criar(){
    if(this.user.password != this.user.confirm.confirm_password){
      
      return;
    }
      
  }
}
