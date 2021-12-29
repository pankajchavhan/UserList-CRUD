import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Users } from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = ''
  constructor(private http:HttpClient) { 
    this.baseUrl =environment.apiUrl;
    
  }
  getAllUsers(){
    return this.http.get<any>(this.baseUrl+ "/Users")
  }

  getUserbyId(id:any){
    return this.http.get<Users>(this.baseUrl+"/Users"+'/'+id)
  }

  addUsers(user:any){
      return this.http.post<Users>(this.baseUrl+ "/Users",JSON.stringify(user))
  }

  // editUsers(id:any, user:any){
  //   return this.http.put<Users>(this.baseUrl+"/Users"+'/'+id,JSON.stringify(user))
  // }
  // deleteUsers(id:any){
  //   return this.http.delete<Users>(this.baseUrl+"/Users"+'/'+id)
  // }
   // UPDATE, PUT METHOD
  updateUser(id, users) {
   // console.log(users);
    
    return this.http.put<Users>(this.baseUrl+"/Users/"+id,users);
    // .subscribe(data => {
    //     this.dialogData = kanbanItem;
    //     this.toasterService.showToaster('Successfully edited', 3000);
    //   },
      // (err: HttpErrorResponse) => {
      //   this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      // }
    // );
  }

  // DELETE METHOD
  deleteUser(id) {
    return this.http.delete<Users>(this.baseUrl+"/Users/"+id)
    // .subscribe(data => {
    //   console.log(data['']);
    //     this.toasterService.showToaster('Successfully deleted', 3000);
    //   },
    //   (err: HttpErrorResponse) => {
    //     this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    //   }
    // );
  }
  
}
