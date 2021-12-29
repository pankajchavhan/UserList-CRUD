import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/model/users';
import { DataService } from 'src/app/service/data.service';
import { DeleteComponent } from '../dialog/delete/delete.component';
import { EditComponent } from '../dialog/edit/edit.component';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {
  //.storing dialogdata
  UsersData: any;
  data1: Users[] = [];
  male = 0;
  female = 0;
  progressbarValue = 0;
  get:Subscription;
  constructor(private dataservice: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsersdata();
   
  }
  ELEMENT_DATA: Users[] = []
  displayedColumns: string[] = ['select', 'name', 'email', 'gender', 'address', 'dob', 'delete', 'edit'];
  dataSource = new MatTableDataSource<Users>(this.ELEMENT_DATA);
  selection = new SelectionModel<Users>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getUsersdata() {
   let get= this.dataservice.getAllUsers().subscribe(res => {
      this.data1 = res;
      this.dataSource.data = res
      if (res.length <= 10) {
        this.progressbarValue = res.length * 10
       // console.log(res.length);

      }
      //console.log(this.data1);
      
      this.dataSource.data.forEach((element, index) => {
        this.male = 0;
        this.female = 0;
        // console.log(element.gender);
        if (element.gender == "Male") {
          this.male = this.male + 1;
        } else
          if (element.gender == "Female"){
             this.female = this.female + 1;
          }
           
      })
     
    })
  }


  editUsersdetails(users) {
    this.dataservice.updateUser(users.id,users).subscribe(data => {
      //console.log(data);
      
    });
    const dialogRef = this.dialog.open(EditComponent, {
      data: { id: users.id, name: users.name, email: users.email, gender: users.gender, address: users.address, dob: users.dob }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  deleteUserDetails(users) {
    
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { id: users.id, name: users.name, email: users.email, gender: users.gender, address: users.address, dob: users.dob }
    });
   
    dialogRef.afterClosed().subscribe(result => {debugger
       //console.log(`Dialog result: ${result}`);
       this.getUsersdata();
    });
   
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
  checkboxLabel(row?: Users): string {
    
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
  ngOnDestroy(){debugger
    this.get.unsubscribe
  }
}