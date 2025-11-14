// enrollment-response.interface.ts
export interface EnrollmentResponse {
  enrollmentId: number;
  name: string; // This is the correct field name from your form
  studentName?: string; // Some APIs might use this
  contactNo: string;
  email: string;
  courseId: string;
  courseName?: string;
  finalAmount: number;
  discountGiven: number;
  enrollmentDate: string;
  enrollmentDoneByUserId: number;
  discountApprovedByUserId: number;
  isFeesCompleted: boolean;
  city: string;
  state: string;
  pincode: string;
  qualification: string;
  collegeName: string;
  collegeCity: string;
  familyDetails: string;
  aadharCard: string;
  profilePhotoName: string;
  refrenceById: number;
  instituteId: string;
}