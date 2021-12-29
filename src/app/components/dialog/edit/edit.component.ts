import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  isMale = true;
  isFemale = false;
  
  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }
    

  ngOnInit(): void {
   // console.log(this.data);
   // console.log( this.data.gender);
     if(this.data.gender=="Male"){
    //   document.getElementById("female").removeAttribute("checked");
    this.isMale = true;
    this.isFemale = false;
     }else if(this.data.gender=="Female"){
    //   document.getElementById("male").removeAttribute("checked");
    this.isMale = false;
    this.isFemale = true;
     }
   
  }

submit() {
// emppty stuff
}

onNoClick(): void {
this.dialogRef.close();
}

onSave(): void {
this.dataService.updateUser(this.data.id,this.data);
}
}



