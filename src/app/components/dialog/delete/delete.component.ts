import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit  {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) {
     
     }
ngOnInit(): void {
    
}

onNoClick(): void {
this.dialogRef.close();
}

confirmDelete(){
this.dataService.deleteUser(this.data.id).subscribe(res=>{
  this.onNoClick();
//this.dataService.getAllUsers()
return res;
});

}
}

