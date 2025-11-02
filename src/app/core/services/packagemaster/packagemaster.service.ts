import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiModel } from '../../model/interfaces/APIResponse';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { APIConstant } from '../../constant/Constant';
import { PackageModel } from '../../model/classes/package';

@Injectable({
  providedIn: 'root'
})
export class PackagemasterService {

  constructor(private http:HttpClient) { }

    getAllPackages(): Observable<IApiModel> {
    return this.http.get<IApiModel>(`${environment.API_URL}${APIConstant.PACKAGE.GET_ALL_PACKAGES}`);
    }

    createNewPackagemaster(obj:PackageModel):Observable<IApiModel>{
     return this.http.post<IApiModel>(`${environment.API_URL}${APIConstant.PACKAGE.CREATE_NEW_PACKAGES}`,obj);
    }

    updateNewpackagemaster(id:number,obj:PackageModel):Observable<IApiModel>{
      return this.http.put<IApiModel>(`${environment.API_URL}${APIConstant.PACKAGE.UPDATE_PACKAGES}${id}`,obj);
    }

    deleteNewPackagemaster(id:number):Observable<IApiModel>{
      return this.http.delete<IApiModel>(`${environment.API_URL}${APIConstant.PACKAGE.DELETE_PACKAGES}${id}`)
    }

    getNewPackagemasterBYID(id:number):Observable<IApiModel>{
     return this.http.get<IApiModel>(`${environment.API_URL}${APIConstant.PACKAGE.GET_ALL_FILTER_PACKAGES_BY_ID}${id}`)
    }
}