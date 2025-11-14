import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIConstant } from '../../constant/Constant';
import { IApiModel } from '../../model/interfaces/APIResponse';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { courseModel } from '../../model/classes/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http:HttpClient) { }

  getAllCourse():Observable<any>{
    return this.http.get<any>(`${environment.API_URL}${APIConstant.COURSE.GET_ALL_COURSE}`); 
  }

  getCourseByID(id:number){
     return this.http.get<any>(`${environment.API_URL}${APIConstant.COURSE.GET_COURSE_BY_ID}${id}`); 
  }

  CreateNewCourse(obj:courseModel):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}${APIConstant.COURSE.CREATE_NEW_COURSE}`,obj)
  }

  UpdateCourse(id:number,obj:courseModel){
    return this.http.put<any>(`${environment.API_URL}${APIConstant.COURSE.UPDATE_COURSE}`,obj);
  }
  
  DeleteCourse(id:number){
    return this.http.delete<any>(`${environment.API_URL}${APIConstant.COURSE.DELETE_COURSE}${id}`);
  }
}
