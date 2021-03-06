import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authServie : AuthService) { }

  maxDate = new Date();

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form : NgForm){
    // console.log(form)
    this.authServie.registerUser({
      email:form.value.email,
      password:form.value.password
    })
  }

}
