import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { from } from 'rxjs';
import { UserServiceService } from '../user-service.service';
import { Router} from '@angular/router'
import { User } from './user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public myId="txtName";
  public isDisabled=false;
  public greeting="";
  @Input("parentData")
  public parentName:any;
  public Users:any;
  public errMsg:any;
  public userModel=new User(0,"","","",0);
  public showAlert=false;
  public alertMsg="";
  public skills=[{id:101,name:"Core Java"},{id:102,name:".Net"},{id:103,name:"Python"}]

  @Output() public childEvent=new EventEmitter();

  sendData(){

    this.childEvent.emit(this.Users);
  }

  addUser(){
    this._userService.isAdding=1;
    this._router.navigate(['addUser']);
  }

editUser(u:any){
  this._userService.isAdding=0;
  this._userService.userModel=u;
  
  this._router.navigate(['addUser']);
}

deleteUser(userModel:any){
  this._userService.deleteUser(userModel)
                .subscribe(data=>{
                 this.Users.splice(this.Users.indexOf(userModel), 1);
                   //this._router.navigate(['showDetails']);
                   this.showAlert=true;
                   this.alertMsg='User Details Deleted successful';
              },
                error => this.errMsg = error)
}

  greetUser(){
    this.greeting="Welcome to my Project"
    console.log(this.greeting);
  }

  constructor(private _userService: UserServiceService,private _router:Router){

  }
  ngOnInit(){
    this._userService.isAdding=1;
    this._userService.getUserList()
                .subscribe(data=>{
                  this.Users=data
                  for (let item of this.Users) {
                    for(let s of this.skills){
                      if(item.skills == s.id){
                        item.skillName=s.name;
                      }
                    }
                  }
                },
                error => {
                  this.showAlert=true;
                  this.alertMsg=error;
                })
  }
}
