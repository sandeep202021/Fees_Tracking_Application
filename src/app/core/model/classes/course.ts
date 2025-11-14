export class courseModel {
   
      courseId: number;
      courseName: string;
      courseCost: number;
      //creratedDate: string;
      isActive: true;
      duration: string;
      instituteId: 0;
      courseDescription: string;

    constructor() {
        this.courseId= 0;
        this.courseName= "";
        this.courseCost= 0;
       // this.creratedDate= "";
        this.duration="";
        this.instituteId=0;
        this.isActive=true; 
        this.courseDescription= "";  
    }
}