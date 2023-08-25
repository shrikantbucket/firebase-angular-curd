import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Users } from './users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth:AngularFireAuth, private router :Router, private afs:Firestore) {  }



  // Login method
  login(email : string , password : string){
    this.fireauth.signInWithEmailAndPassword(email,password).then((res)=>{
      
      localStorage.setItem('token','true');
      this.router.navigate(['home']);
      // if(res.user?.emailVerified == true){
      // }else{
      //   alert("Email is not Varifyed, Please do the Varification.");
      // }

    },err =>{
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }


  // register method
  register(email:string, password:string, user?:Users){
    this.fireauth.createUserWithEmailAndPassword(email,password).then((res)=>{
      alert("Registration Successful");

      if(user){
        this.addUser(user);
      }
      
      this.router.navigate(['/login']);

      this.sendEmailforVarification(res.user);

    },err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }


  //sign out
  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    },err => {
      alert(err.message);
    })
  }


  // Forgot Password
  forgotPassword(email:string){
    this.fireauth.sendPasswordResetEmail(email).then(()=>{
        this.router.navigate(['/verify-email']);
    },err =>{
      alert('Someting is wrong');
    });
  }





  // Add a New User
  addUser(user:Users){
    user.id = doc(collection(this.afs, 'id')).id;
    return addDoc(collection(this.afs, 'Users'),user);
  }

  // Get User Data
  getUsers():Observable<Users[]>{
    let usersRef = collection(this.afs, 'Users');
    return collectionData(usersRef,{idField:'id'}) as Observable<Users[]>;
  }

  // Delete a User
  deleteUsers(user:Users){
    let docRef = doc(this.afs, `Users/${user.id}`);
    return deleteDoc(docRef);
  }

  // Update a User
  updateUser(user:Users, users:any){
    let docRef =doc(this.afs, `Users/${user.id}`);
    return updateDoc(docRef,users);
  }


  // Verify User
  sendEmailforVarification(user : any){
    user.sendEmailforVarification().then((res:any)=>{
      this.router.navigate(["/verify-email"]);
    },(err :any) =>{
        alert("Something Went Wrong, Not able to send email.");
    })
  }

}
