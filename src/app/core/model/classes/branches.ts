export class BranchesModel{
  branchId: number;
  branchName: string;
  city: string;
  state: string;
  pincode: string;
  location: string;
  instituteId: number;
  branchContactNo: string;
  branchEmail: string;
  branchCode: string ;  
   
  constructor(){
  this.branchId= 0,
  this.branchName= "",
  this.city="",
  this.state="",
  this.pincode="",
  this.location="",
  this.instituteId= 0,
  this.branchContactNo= "",
  this.branchEmail= "",
  this.branchCode= "" 
  }
}