import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';

import { CategoryService } from 'src/app/Services/category.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { CategoryComponent } from '../dialog/view-bill-products/category/category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
 displayedColumns:string[] = ['name','edit'];
 dataSource:any;
 respoenseMessage:any;
 
  constructor(private categoryService:CategoryService,

  private dialog:MatDialog,
  private snackbarService: SnackbarService,
  private router:Router
  ) { }
  ngOnInit(): void {
 
  this.tableData();
}
tableData(){
  this.categoryService.getcategorys().subscribe((response:any)=>{

    this.dataSource= new MatTableDataSource(response);
  },(error:any)=>{

    if(error.eroor?.message){
      this.respoenseMessage = error.error?.message;
    }
    else{
      this.respoenseMessage = GlobalConstants.genericError;
    }
     this.snackbarService.openSnackBar(this.respoenseMessage,GlobalConstants.error);
  })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  handelAddAction(){
    const dialogConfig = new MatDialogConfig() 
    dialogConfig.data={
      action:'Add'
    }
    dialogConfig.width ="850px";
    const dialogRef = this.dialog.open(CategoryComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
   
   
    
  }

  handelEditAction(value:any){
    const dialogConfig = new MatDialogConfig() 
    dialogConfig.data={
      action:'Edit'
    }
    dialogConfig.width ="850px";
    const dialogRef = this.dialog.open(CategoryComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })

   
   
  }
handelDeleteAction(values:any){
  const dialogConfig = new MatDialogConfig() 
  dialogConfig.data={
    message:'delete'+values.name+'products'
  };

  const dialogRef = this.dialog.open(CategoryComponent,dialogConfig);
  this.router.events.subscribe(()=>{
    dialogRef.close();
  })
}
}