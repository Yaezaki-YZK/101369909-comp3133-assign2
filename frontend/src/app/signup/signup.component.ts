import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Apollo } from 'apollo-angular';
import { register } from "../graphql/graphql.queries"
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public signUpForm !: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private apollo: Apollo) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: [""],
      email: [""],
      password: [""]
    })
  }

  signUp(): void {
    const variables = {
      username: this.signUpForm.value.username,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    };

    this.apollo.mutate({
      mutation: register,
      variables,
      fetchPolicy: 'no-cache' 
    }).subscribe(
      ({ data }) => {
        alert('Sign up successful');
        this.router.navigate(['login']);
      },
      (error) => {
        console.error(error);
        alert('ass');
      }
    );
  }

}
