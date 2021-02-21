import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import {User} from '../user/user';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public selectedUser:any;
  userModel=new User(0,"","","",0);
  public isAdding=0;
  public isSaving=0;
  public skills=[{id:101,name:"Core Java"},{id:102,name:".Net"},{id:103,name:"Python"}]
  public showAlert=false;
  public alertMsg="";
  public alertType="danger";

  constructor(private _userService:UserServiceService,private _router:Router) { }
  ngOnInit(): void {
    if(this._userService.isAdding==1){
      this.isAdding=this._userService.isAdding;
    }
    else{
      this.userModel=this._userService.userModel;
    }
  }

  saveUser(){
    this.isSaving=1;
    if(this._userService.isAdding==0){
      this._userService.editUser(this.userModel).subscribe(data=>
        {
          this.alertMsg='User Updated successful';
          this.showAlert=true;
        },error => console.log(error));
    }
    else{
      this._userService.saveUser(this.userModel).subscribe(data=>{
        this.showAlert=true;
        this.alertMsg='User Saved successful';
      },error => console.log(error));
    }
    this.clearForm();
  }

  clearForm(){
    this.userModel=new User(0,"","","",0);
    this.isSaving=0;
    this.isAdding=1;
    this._userService.isAdding=1;
  }
}
