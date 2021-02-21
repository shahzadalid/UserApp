import { Component } from '@angular/core';
import { UserServiceService } from './user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: any="userApp";
  public name=this.title;
  public message="";
  public Users:any;
  public errMsg:any;


  
}
