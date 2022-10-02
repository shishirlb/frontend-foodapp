import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../Services/snackbar.service';
import { UserService } from '../Services/user.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm:any = FormGroup;
  responseMessage:any;
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    private snackbarService:SnackbarService,
    private dialogRef:MatDialogRef<SignupComponent>) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      password:[null,[Validators.required]],
    })
  }

  handleSubmit(){
    var formData=this.signupForm.value;
    var data={
      email:formData.email,
      password:formData.password
    }

    this.userService.signUp(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.responseMessage=response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"");
      this.router.navigate(['/']);
    },(error)=>{
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }
      else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

}
