import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(public api:AuthApiService){}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.api.getAuthentication(this.loginForm.value).subscribe(res=>{
       if(res.status == true){
        console.log("Authentication Successfully");
       }
       else{
        console.log("Authentication Failed");
       }
          
      });
    }
  }

}
