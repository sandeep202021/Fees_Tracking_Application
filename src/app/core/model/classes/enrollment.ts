export class enrollmentModel {
    enrollmentId: number;
  courseId: string; // API expects string
  enrollmentDoneByUserId: number;
  enrollmentDate: string;
  finalAmount: number;
  discountGiven: number;
  discountApprovedByUserId: number;
  isFeesCompleted: boolean;
  name: string;
  contactNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  qualification: string;
  collegeName: string;
  collegeCity: string;
  familyDetails: string;
  aadharCard: string;
  profilePhotoName: string;
  refrenceById: number; // Note: API has typo "refrenceById" not "referenceById"
  instituteId: string; // API expects string

  constructor() {
    this.enrollmentId = 0;
    this.courseId = "";
    this.enrollmentDoneByUserId = 0;
    this.enrollmentDate = "";
    this.finalAmount = 0;
    this.discountGiven = 0;
    this.discountApprovedByUserId = 0;
    this.isFeesCompleted = true;
    this.name = "";
    this.contactNo = "";
    this.email = "";
    this.city = "";
    this.state = "";
    this.pincode = "";
    this.qualification = "";
    this.collegeName = "";
    this.collegeCity = "";
    this.familyDetails = "";
    this.aadharCard = "";
    this.profilePhotoName = "";
    this.refrenceById = 0;
    this.instituteId = "";
  }
}