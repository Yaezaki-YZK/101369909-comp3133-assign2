import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { login } from "../graphql/graphql.queries"
import { Apollo } from 'apollo-angular';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup

  constructor(private formbuilder: FormBuilder,private http: HttpClient, private router: Router, private apollo: Apollo) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['', Validators.required]
    })
  }
  login(){
    const variables = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.apollo.mutate({
      mutation: login,
      variables,
      fetchPolicy: 'no-cache' 
    }).subscribe(
      ({ data }) => {
        alert('Login successful');
        this.router.navigate(['employee']);
      },
      (error) => {
        console.error(error);
        alert('Invalid email or password. Please try again.');
      }
    );
  }

}
