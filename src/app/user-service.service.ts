import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {IUser} from './user/user';
import { Observable,throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import {User} from './user/user'

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  public users:any;
  public isAdding=0;
  public selectedUser:any;
  public userModel=new User(0,"","","",0);
  public showAlert=true;
  public alertMsg="";
  constructor(private _http:HttpClient) { }

  ngOnInit(): void{
    
  }

  private _url:string="https://localhost:44317/api/Values";

  getUrl() {
    this._http.get('/assets/data/url.txt',{responseType: 'text'}
    ).subscribe(data => {
      console.log(data);
      this._url=data;
  })
  }

  saveUser(userModel:User):Observable<User>{
    return this._http.post<User>(this._url,userModel,{
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.errorHandler));
  }


  editUser(userModel:User):Observable<User>{
    return this._http.put<User>(this._url,userModel,{
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.errorHandler));
  }

  deleteUser(userModel:User){
      return  this._http.delete(this._url+"/"+userModel.id,{
        headers:new HttpHeaders({
          'Content-Type':'application/json'
        })
      }).pipe(catchError(this.errorHandler));
  }

  getUserList():Observable<User[]> {
    return this._http.get<User[]>(this._url)
                .pipe(catchError(this.errorHandler));
  }

  errorHandler(error:HttpErrorResponse){
    return throwError(error.message || "Server Error");
  };
}
