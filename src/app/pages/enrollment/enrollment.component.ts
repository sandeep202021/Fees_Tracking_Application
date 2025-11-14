import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../core/services/course/course.service';
import { IApiModel } from '../../core/model/interfaces/APIResponse';
import { courseModel } from '../../core/model/classes/course';
import { instituteModel } from '../../core/model/classes/institute';
import { InstitutemasterService } from '../../core/services/institute/institutemaster.service';
import { MasterServiceService } from '../../core/services/master/master-service.service';
import { MasterModel } from '../../core/model/classes/master';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnrollmentService } from '../../core/services/enrollment/enrollment.service';
import { enrollmentModel } from '../../core/model/classes/enrollment';
import { ToastMessages } from '../../core/constant/Constant';
import { ToastService } from '../../core/services/message/toast.service';
import { CommonModule, JsonPipe, TitleCasePipe } from '@angular/common';
import { EnrollmentResponse } from '../../core/model/interfaces/enrollment-response.interface';

@Component({
  selector: 'app-enrollment',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './enrollment.component.html',
  styleUrl: './enrollment.component.css'
})
export class EnrollmentComponent implements OnInit {

  ngOnInit(): void {
    this.loadingCourse();  
    this.loadInstitute();
    this.loadMaster();
    this.loadEnrollments();
  }

  courseList: courseModel[] = [];
  instituteMasterList: instituteModel[] = [];
  masterList: MasterModel[] = [];
  enrollmentList: enrollmentModel[] = [];  
  loading: boolean = false;
  currentInstituteId: number = 0;
  currentUserId: number = 0;
  currentUserName: string = '';

  enrollmentForm: FormGroup;

  CourseServ = inject(CourseService);
  InstituremasterServ = inject(InstitutemasterService);
  masterServ = inject(MasterServiceService);
  enrollServ = inject(EnrollmentService);
  toast = inject(ToastService);

  constructor(private formbuilder: FormBuilder) {
    this.enrollmentForm = this.formbuilder.group({
      courseId: ['', Validators.required],
      enrollmentDoneByUserId: [0],
      enrollmentDate: [new Date().toISOString().split('T')[0], Validators.required],
      finalAmount: [0],
      discountGiven: [0],
      discountApprovedByUserId: [0],
      isFeesCompleted: [true],
      name: ['', [Validators.required]],
      contactNo: ['', [Validators.required]],
      email: [''],
      city: [''],
      state: [''],
      pincode: [''],
      qualification: [''],
      collegeName: [''],
      collegeCity: [''],
      familyDetails: [''],
      aadharCard: [''],
      profilePhotoName: [''],
      refrenceById: [0],
      instituteId: ['', Validators.required]
    });
  }

 
  getLoginUserData(): any {
    try {
      const loginUserData = localStorage.getItem('loginUser');
      if (loginUserData) {
        const userData = JSON.parse(loginUserData);
        return userData;
      }
      return null;
    } catch (error) {
      return null;
    }
    
  }

  getInstituteIdFromUser(): number {
    const userData = this.getLoginUserData();
    if (userData && userData.data && userData.data.instituteId) {
      this.currentInstituteId = userData.data.instituteId;
      return this.currentInstituteId;
    } else {
      return 0;
    }
  }

  getUserIdFromUser(): number {
    const userData = this.getLoginUserData();
    if (userData && userData.data && userData.data.userId) {
      this.currentUserId = userData.data.userId;
      return this.currentUserId;
    }
    return 0;
  }

  getUserNameFromUser(): string {
    const userData = this.getLoginUserData();
    if (userData && userData.data && userData.data.userName) {
      this.currentUserName = userData.data.userName;
      return this.currentUserName;
    }
    return '';
  }

  getUserRoleFromUser(): string {
    const userData = this.getLoginUserData();
    if (userData && userData.data && userData.data.role) {
      return userData.data.role;
    }
    return '';
  }

  loadEnrollments(): void {
    this.loading = true;
    const instituteId = this.getInstituteIdFromUser();
    
    if (!instituteId || instituteId === 0) {
      this.toast.showError(ToastMessages.ERROR);
      this.loading = false;
      return;
    }


    this.enrollServ.getEnrollmentsByInstituteId(instituteId).subscribe({
      next: (result: IApiModel) => {
        this.loading = false;
        
        if (result && result.data) {
          this.enrollmentList = this.mapEnrollmentData(result.data);
          this.toast.showSuccess(ToastMessages.SAVE_SUCCESS);
        } else {
          this.enrollmentList = [];         
           this.toast.showSuccess(ToastMessages.SAVE_SUCCESS);
        }
      },
      error: (error: any) => {
        this.loading = false;        
        let errorMessage = 'Failed to load enrollments';
        if (error.status === 404) {
          errorMessage = 'No enrollments found for your institute';
        } else if (error.status === 403) {
          errorMessage = 'Access denied to institute enrollments';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }
        
        this.toast.showError({ 
          message: errorMessage, 
          title: 'Error' 
        });
      }
    });
  }

  private mapEnrollmentData(data: any[]): EnrollmentResponse[] {
    return data.map(item => ({
      enrollmentId: item.enrollmentId || item.id || 0,
      name: item.name || item.studentName || item.fullName || item.Name || 'No Name',
      contactNo: item.contactNo || item.contact || item.phone || item.mobile || 'N/A',
      email: item.email || item.emailAddress || '',
      courseId: item.courseId || item.courseID || '',
      courseName: item.courseName || '',
      finalAmount: item.finalAmount || item.finalFees || item.amount || 0,
      discountGiven: item.discountGiven || item.discount || 0,
      enrollmentDate: item.enrollmentDate || item.enrolledDate || item.date || '',
      enrollmentDoneByUserId: item.enrollmentDoneByUserId || item.enrolledBy || 0,
      discountApprovedByUserId: item.discountApprovedByUserId || item.discountApprovedBy || 0,
      isFeesCompleted: item.isFeesCompleted !== undefined ? item.isFeesCompleted : true,
      city: item.city || '',
      state: item.state || '',
      pincode: item.pincode || item.zipCode || '',
      qualification: item.qualification || '',
      collegeName: item.collegeName || '',
      collegeCity: item.collegeCity || '',
      familyDetails: item.familyDetails || '',
      aadharCard: item.aadharCard || item.aadharNumber || '',
      profilePhotoName: item.profilePhotoName || item.photo || '',
      refrenceById: item.refrenceById || item.referenceById || 0,
      instituteId: item.instituteId || item.instituteID || ''
    }));
  }
   
 getCourseName(courseId: any): string {
  
  if (!courseId && courseId !== 0) {
    return 'N/A';
  }

  const searchId = courseId?.toString().trim();
  
  let course = this.courseList.find(c => c.courseId?.toString().trim() === searchId);
  
  if (!course && !isNaN(Number(searchId))) {
    course = this.courseList.find(c => Number(c.courseId) === Number(searchId));
  }
  
  if (!course) {
    course = this.courseList.find(c => {
      const cId = c.courseId?.toString().trim();
      return cId && searchId && (cId.includes(searchId) || searchId.includes(cId));
    });
  }
  
  if (!course && this.courseList.length > 0) {
    return this.courseList[0].courseName + ' (Fallback)';
  }
  
  return course ? course.courseName : `Course ID: ${searchId}`;
}

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return 'Invalid Date';
    }
  }

  calculateOriginalCost(item: EnrollmentResponse): number {
    return (item.finalAmount || 0) + (item.discountGiven || 0);
  }

  
  getInstituteName(instituteId: string): string {
    if (!instituteId) return 'N/A';
    const institute = this.instituteMasterList.find(i => i.instituteId?.toString() === instituteId.toString());
    return institute ? institute.name : 'Unknown Institute';
  }

  getReferenceName(refrenceById: number): string {
    if (!refrenceById) return 'N/A';
    const reference = this.masterList.find(m => m.masterId === refrenceById);
    return reference ? reference.masterValue : 'Unknown Reference';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.enrollmentForm.patchValue({
        profilePhotoName: file.name
      });
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const preview = document.getElementById('profilePreview') as HTMLImageElement;
        if (preview) {
          preview.src = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  refreshEnrollments(): void {
    this.loadEnrollments();
  }

  getCurrentInstituteInfo(): string {
    if (this.currentInstituteId) {
      const institute = this.instituteMasterList.find(i => i.instituteId === this.currentInstituteId);
      return institute ? institute.name : `Institute ID: ${this.currentInstituteId}`;
    }
    return 'Not available';
  }

  // Get current user info for display
  getCurrentUserInfo(): string {
    return `${this.currentUserName} (${this.getUserRoleFromUser()})`;
  }


  loadingCourse() {
    this.CourseServ.getAllCourse().subscribe({
      next: (result: any) => {
        this.courseList = result;
      },
      error: (error: IApiModel) => {
        console.error('Error loading courses:', error);
      }
    });
  }

  loadInstitute() {
    this.InstituremasterServ.getAllInstituteMaster().subscribe({
      next: (result: IApiModel) => {
        this.instituteMasterList = result.data;
        this.autoSelectUserInstitute();
      },
      error: (error: IApiModel) => {
        console.error('Error loading institutes:', error);
      },
    });
  }

  // Auto-select user's institute in the form
  autoSelectUserInstitute(): void {
    const instituteId = this.getInstituteIdFromUser();
    if (instituteId && instituteId !== 0) {
      this.enrollmentForm.patchValue({
        instituteId: instituteId.toString()
      });
    }
  }

  loadMaster() {
    this.masterServ.getAllMaster().subscribe({
      next: (result: IApiModel) => {
        this.masterList = result.data;
      }
    });
  }

  onSubmit() {
    if (this.enrollmentForm.invalid) {
      this.toast.showError(ToastMessages.ERROR);
      this.enrollmentForm.markAllAsTouched();
      return;
    }

    const formValue = this.enrollmentForm.value;
    const userId = this.getUserIdFromUser();

    const payload: any = {
      
      courseId: String(formValue.courseId || ""),
      enrollmentDoneByUserId: userId || 0,
      finalAmount: Number(formValue.finalAmount) || 0,
      discountGiven: Number(formValue.discountGiven) || 0,
      discountApprovedByUserId: Number(formValue.discountApprovedByUserId) || 0,
      refrenceById: Number(formValue.refrenceById) || 0,
      instituteId: String(formValue.instituteId || ""),
      isFeesCompleted: Boolean(formValue.isFeesCompleted),
      enrollmentDate: formValue.enrollmentDate || new Date().toISOString().split('T')[0],
      name: String(formValue.name || ""),
      contactNo: String(formValue.contactNo || ""),
      email: String(formValue.email || ""),
      city: String(formValue.city || ""),
      state: String(formValue.state || ""),
      pincode: String(formValue.pincode || ""),
      qualification: String(formValue.qualification || ""),
      collegeName: String(formValue.collegeName || ""),
      collegeCity: String(formValue.collegeCity || ""),
      familyDetails: String(formValue.familyDetails || ""),
      aadharCard: String(formValue.aadharCard || ""),
      profilePhotoName: String(formValue.profilePhotoName || "")
    };


    this.enrollServ.createNewEnrollment(payload).subscribe({
      next: (res: any) => {
        this.toast.showSuccess(ToastMessages.SAVE_SUCCESS);
        this.onCancel();
        this.loadEnrollments(); // Refresh the list after successful creation
      },
      error: (err: any) => {
        console.error('Error creating enrollment:', err);
        let errorMessage = 'Unknown error occurred';
        if (err.error && typeof err.error === 'string') {
          errorMessage = err.error;
        } else if (err.error && err.error.message) {
          errorMessage = err.error.message;
        } else if (err.message) {
          errorMessage = err.message;
        }
        
        this.toast.showError({ 
          message: `Error: ${errorMessage}`, 
          title: 'API Error' 
        });
      }
    });
  }

  onDelete(id: any) {
  const enrollmentId = Number(id);
  if (!enrollmentId || enrollmentId === 0) {
    this.toast.showError(ToastMessages.ERROR);
    return;
  }

  if (confirm('Are you sure you want to delete this enrollment?')) {
    this.enrollServ.deleteEnrollment(enrollmentId).subscribe({
      next: () => {
        this.toast.showSuccess(ToastMessages.DELETE_SUCCESS);
        this.loadEnrollments();
      },
      error: (error) => {
        console.error('Delete error:', error);
        this.toast.showError(ToastMessages.ERROR);
      }
    });
  }
}

  onCancel() {
    this.enrollmentForm.reset({
      isFeesCompleted: true,
      enrollmentDate: new Date().toISOString().split('T')[0],
      finalAmount: 0,
      discountGiven: 0,
      enrollmentDoneByUserId: 0,
      discountApprovedByUserId: 0,
      refrenceById: 0
    });
    this.autoSelectUserInstitute();
  }
}