import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginModel, MasterModel } from '../../../core/model/classes/master';
import { Observable } from 'rxjs';
import { IApiModel } from '../../model/interfaces/APIResponse';
import { environment } from '../../../../environments/environment';
import { APIConstant } from '../../constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class MasterServiceService {

  constructor(private http:HttpClient) { }

  getAllMaster():Observable<IApiModel>{
    return this.http.get<IApiModel>(environment.API_URL + APIConstant.MASTER.GET_ALL_MASTER);
  }
   
  saveMaster(obj:MasterModel):Observable<IApiModel>{
    return this.http.post<IApiModel>(`${environment.API_URL}${APIConstant.MASTER.CREATE_NEW_MASTER}`,obj);
  }
  updateMaster(id:number,obj:MasterModel):Observable<IApiModel>{
    return this.http.put<IApiModel>(`${environment.API_URL}${APIConstant.MASTER.UPDATE_MASTER}${id}`,obj);
    
  }

  deleteMaster(id:number):Observable<IApiModel>{
    return this.http.delete<IApiModel>(`${environment.API_URL}${APIConstant.MASTER.DELETE_MASTER}${id}`);
  }

  filterMaster(name:string):Observable<IApiModel>{
    return this.http.get<IApiModel>(`${environment.API_URL + APIConstant.MASTER.GET_ALL_FILTER_MASTER}${name}`);
  }

  login(obj: loginModel) {
    debugger
     
    //    const tokenData = localStorage.getItem("token")
    //   const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${tokenData}`  
    // });

    // return this.http.post("https://feestracking.freeprojectapi.com/api/User/login",obj,{headers})
    return this.http.post(`${environment.API_URL}${APIConstant.LOGIN.GET_LOGIN}`,obj)
  }

  savedata(userData:any){
   localStorage.setItem('InstituteData',JSON.stringify(userData));
  }
}
