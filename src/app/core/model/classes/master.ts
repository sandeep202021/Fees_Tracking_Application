export class MasterModel {

    masterId: number;
    masterFor: string;
    masterValue: string;

    constructor() {
        this.masterId = 0;
        this.masterFor = "";
        this.masterValue = "";
    }
}

export class loginModel{
   userName: string;
   password: string;
   constructor(){
    this.userName = "";
   this.password ="";
   }
}