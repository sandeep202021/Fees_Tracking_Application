import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchesModel } from '../../model/classes/branches';
import { IApiModel } from '../../model/interfaces/APIResponse';
import { environment } from '../../../../environments/environment';
import { APIConstant } from '../../constant/Constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  constructor(private http: HttpClient) { }

  getAllBranches(){
      //return this.http.get<IApiModel>(environment.API_URL + APIConstant.BRANCH.GET_ALL_BRANCHES);
      return this.http.get(environment.API_URL + APIConstant.BRANCH.GET_ALL_BRANCHES);
  }
  getBranchesByid(id:number){
    return this.http.get(`${environment.API_URL}${APIConstant.BRANCH.GET_BRANCH_BY_ID}${id}`)
  }
  createNewBranches(obj:BranchesModel):Observable<IApiModel>{
      return this.http.post<IApiModel>(`${environment.API_URL}${APIConstant.BRANCH.CREATE_NEW_BRANCH}`,obj);
  }
  updateBranches(obj:BranchesModel,id:number){
    return this.http.put(`${environment.API_URL}${APIConstant.BRANCH.UPDATE_BRANCH}`,obj);
  }
  deleteBranch(id:number){
    return this.http.delete(`${environment.API_URL}${APIConstant.BRANCH.DELETE_BRANCH}${id}`)
  }
}
