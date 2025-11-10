export class PackageModel {
   
      courseId: number;
      courseName: string;
      courseCost: number;
      creratedDate: string;
      isActive: true;
      duration: string;
      instituteId: 0;

    constructor() {
        this.courseId= 0;
        this.courseName= "";
        this.courseCost= 0;
        this.creratedDate= "";
        this.duration="";
        this.instituteId=0;
        this.isActive=true;   
    }
}