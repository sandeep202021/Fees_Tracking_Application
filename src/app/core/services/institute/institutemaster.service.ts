import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiModel } from '../../model/interfaces/APIResponse';
import { environment } from '../../../../environments/environment';
import { APIConstant } from '../../constant/Constant';
import { instituteModel } from '../../model/classes/institute';

@Injectable({
  providedIn: 'root'
})
export class InstitutemasterService {

  constructor(private http:HttpClient) { }

  getAllInstituteMaster():Observable<IApiModel>{
  return this.http.get<IApiModel>(`${environment.API_URL}${APIConstant.INSTITUTE.GET_ALL_INSTITUTE}`); 
  }

  createNewInstituteMaster(obj:instituteModel):Observable<IApiModel>{
  //return this.http.post<IApiModel>(`${environment.API_URL}${APIConstant.INSTITUTE.CREATE_NEW_INSTITUTE}`,obj);
  return this.http.post<IApiModel>("https://feestracking.freeprojectapi.com/api/InstituteMaster/create-institute",obj);
  }

  updateNewInstituteMaster(id:number,obj:instituteModel):Observable<IApiModel>{
   return this.http.put<IApiModel>(`${environment.API_URL}${APIConstant.INSTITUTE.UPDATE_INSTITUTE}${id}`,obj);
  }

  deleteInstituteMaster(id:number):Observable<IApiModel>{
    return this.http.delete<IApiModel>(`${environment.API_URL}${APIConstant.INSTITUTE.DELETE_INSTITUE}${id}`);
  }

}
