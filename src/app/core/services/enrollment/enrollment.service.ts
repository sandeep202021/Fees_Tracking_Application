import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiModel } from '../../model/interfaces/APIResponse';
import { enrollmentModel } from '../../model/classes/enrollment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  constructor(private http: HttpClient) { }

  createNewEnrollment(obj: any): Observable<any> {
    console.log('Sending to API:', obj);
    return this.http.post(
      "https://feestracking.freeprojectapi.com/api/Enrollments/createStudentEnrollment", 
      obj,
      { 
        headers: { 'Content-Type': 'application/json' },
        observe: 'response' // This will give you full response including status
      }
    );
  }

    // Get enrollments by institute ID
  getEnrollmentsByInstituteId(instituteId: number): Observable<IApiModel> {
    return this.http.get<IApiModel>(
      `https://feestracking.freeprojectapi.com/api/Enrollments/getAllEnrollments/${instituteId}`
    );
  }

  // Alternative method to get all enrollments
  // getAllEnrollments(): Observable<any> {
  //   return this.http.get<IApiModel>(
  //     "https://feestracking.freeprojectapi.com/api/Enrollments/getAllEnrollments"
  //   );
  // }
  editEnrollmentById(id:number,obj:any):Observable<any>{
   return  this.http.put<IApiModel>(`https://feestracking.freeprojectapi.com/api/Enrollments/updateEnrollment/${id}`,obj)
  }

  deleteEnrollment(id:number):Observable<IApiModel>{
    return this.http.delete<IApiModel>(`https://feestracking.freeprojectapi.com/api/Enrollments/deleteEnrollment/${id}`)
  }

}
