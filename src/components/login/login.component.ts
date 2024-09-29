import { Component } from '@angular/core';
import UsuarioModel from '../../app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import Toastify from 'toastify-js'
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  users: UsuarioModel[] = [
    {userId: 1, nombre: "gonzalo", clave: "123"},
    {userId: 2, nombre: "ale", clave: "456"}
  ]
  user : UsuarioModel = {
    userId: 0,
    nombre: "",
    clave: ""
  };

  registerNombre : string = "";
  registerClave : string = "";
  registerClave2 : string = "";
  registerEmail : string = ""; 
  flag : boolean = false;
  msjError : string = "";

  public loginsCollection:any[] = [];
  public countLogins:number = 0;
  private sub!:Subscription;
  constructor( private router: Router ,private activatedRoute: ActivatedRoute, private firestore: Firestore, public auth:Auth) {  }

  ngOnInit():void{
    /* const userString = JSON.stringify(this.users);
    localStorage.setItem("users", userString);
 */

   /*  let col = collection(this.firestore, 'logins');
    addDoc(col, {"user": "Gonzalo", "clave": "123"})
    addDoc(col, {"user": "Ale", "clave": "456"}) */
  }
  Login():void {    
    this.GetUser();
    if(this.flag){
      this.router.navigate(["home"]);
      this.LoginLog();
    }else{
      //alert("Usuario o clave incorrecta");
      Toastify({
        text: "Usuario o clave incorrecta",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        //stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "red", //"linear-gradient(to right, #00b09b, #96c93d)"
        },
        //onClick: function(){} // Callback after click
      }).showToast();
    }
  }

  LoginLog() {
    let col = collection(this.firestore, 'logsLogin');
    addDoc(col, { "fecha": new Date(), "user": this.user.nombre})
  }

  Register(){
    debugger
    createUserWithEmailAndPassword(this.auth, this.registerEmail, this.registerClave).then((rest)=>{
      debugger
      if(rest.user.email !== null){
        
      }
    }).catch((e)=>{
      debugger
      switch(e.code){
        case "auth/invalid-email":
          this.msjError = "Email no valido";
          console.log(this.msjError);
          break;
        case "auth/email-already-in-use":
          this.msjError = "Email ya se encuntra en uso";
          console.log(this.msjError);
          break;
        case "auth/weak-password":
          this.msjError = "La contraseña no cumple con las condicones minimas";
          console.log(this.msjError);
          break;
        default :
          this.msjError = e.code;
          console.log(e.code);
          break;
      }
    })
  }

  // Register(){
  //   let col = collection(this.firestore, 'logins');
  //   if(this.registerNombre != "" && this.registerClave != ""){
  //     addDoc(col, { "user": this.registerNombre, "clave": this.registerClave});
  //     //alert("El usuario se creo Correctamente");
  //     Toastify({
  //       text: "El usuario se creo Correctamente",
  //       duration: 3000,
  //       destination: "https://github.com/apvarun/toastify-js",
  //       newWindow: true,
  //       close: true,
  //       gravity: "top", // `top` or `bottom`
  //       position: "left", // `left`, `center` or `right`
  //       stopOnFocus: true,
  //       style: {
  //         background: "linear-gradient(to right, #00b09b, #96c93d)",
  //       }
  //     }).showToast();
  //     this.Login();
  //   }else{
  //     //alert("Datos invalidos");
  //     Toastify({
  //       text: "Datos invalidos",
  //       duration: 30000,
  //       destination: "https://github.com/apvarun/toastify-js",
  //       newWindow: true,
  //       close: true,
  //       gravity: "top", // `top` or `bottom`
  //       position: "left", // `left`, `center` or `right`
  //       stopOnFocus: true,
  //       style: {
  //         background: "red",
  //       }
  //     }).showToast();
  //   }

  //   if(this.flag){
  //     this.router.navigate(["home"]);
  //   }else{ 
  //     //alert("Algo salio mal a la hora del login, por favor intenta ingresar nuevamente");
  //     Toastify({
  //       text: "Algo salio mal a la hora del login, por favor intenta ingresar nuevamente",
  //       duration: 3000,
  //       destination: "https://github.com/apvarun/toastify-js",
  //       newWindow: true,
  //       close: true,
  //       gravity: "top", // `top` or `bottom`
  //       position: "left", // `left`, `center` or `right`
  //       stopOnFocus: true,
  //       style: {
  //         background: "red",
  //       }
  //     }).showToast();
  //     location.reload();
  //   }
  // }

  GetData(){
    debugger
    let col = collection(this.firestore, 'logins');
    
    const observable = collectionData(col);

    this.sub = observable.subscribe((respuesta:any) => {

      //Actualizamos nuestro array
      this.loginsCollection = respuesta;

      //Actualizamos la cantidad de registros que contiene la colección (Ejemplo propuesto en clase)
      this.countLogins = this.loginsCollection.length; 

      //console.log(respuesta);
    })

  }

  GetUsers(): void{
    const strUser = localStorage.getItem("users");

    this.users = JSON.parse(strUser!); 
  }

  GetUser(): void{
    this.GetData();
    this.flag = false;
    for (let i = 0; i < this.loginsCollection.length; i++) {
      if(this.loginsCollection[i].user == this.user.nombre && this.loginsCollection[i].clave == this.user.clave){
        this.flag = true;
      } 
    }
    
  }

  /* GetUser(): boolean{
    this.GetUsers();
    let flag = false;
    for (let i = 0; i < this.users.length; i++) {
      if(this.users[i].nombre == this.user.nombre && this.users[i].clave == this.user.clave){
        flag = true;
      } 
    }
    return flag;
  } */

 
}
