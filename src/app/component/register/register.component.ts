import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Users } from 'src/app/shared/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  //userForm!: FormGroup;  
  firstname:string = "";
  lastname:string = "";
  email:string = "";
  password:string = "";

  userObj:Users = {
    id: '',
    first_name: '',
    last_name: '',
    emailid: ''
  }


  constructor(private auth:AuthService){

  }
  


  register(){

    if(this.firstname == ''){
      alert('Please Enter First Name');
      return;
    }

    if(this.lastname ==''){
      alert('Please Enter Last Name');
      return;
    }
    if(this.email == ''){
      alert('Please enter email');
      return;
    }

    if(this.password ==''){
      alert('Please enter Passeword');
      return;
    }


    this.userObj.id = '';
    this.userObj.emailid = this.email;
    this.userObj.first_name = this.firstname;
    this.userObj.last_name = this.lastname;
    
    this.auth.register(this.email, this.password, this.userObj);


    this.email = "";
    this.password = "";
  
  }

  
}
