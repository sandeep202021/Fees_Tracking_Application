export class EnrollmentEditModal {
  enrollmentId: number;
  studentId: number;
  courseId: number;
  enrollmentDoneByUserId: number;
  enrollmentDate: string;
  finalAmount: number;
  discountGiven: number;
  discountApprovedByUserId: number;
  isFeesCompleted: boolean;
  isConfirmed: boolean;

  constructor() {
    this.enrollmentId = 0;
    this.studentId = 0;
    this.courseId = 0;
    this.enrollmentDoneByUserId = 0;
    this.enrollmentDate = "";
    this.finalAmount = 0;
    this.discountGiven = 0;
    this.discountApprovedByUserId = 0;
    this.isFeesCompleted = true;
    this.isConfirmed = true;
  }
}
