import { Component } from '@angular/core';
import UsuarioModel from '../../app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

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

  public loginsCollection:any[] = [];
  public countLogins:number = 0;
  private sub!:Subscription;
  constructor( private router: Router ,private activatedRoute: ActivatedRoute, private firestore: Firestore) {  }

  ngOnInit():void{
    /* const userString = JSON.stringify(this.users);
    localStorage.setItem("users", userString);
 */

   /*  let col = collection(this.firestore, 'logins');
    addDoc(col, {"user": "Gonzalo", "clave": "123"})
    addDoc(col, {"user": "Ale", "clave": "456"}) */
  }
  Login():void {    
    if(this.flag){
      this.router.navigate(["home"]);
      this.LoginLog();
    }else{
      alert("Usuario o clave incorrecta");
    }
  }

  LoginLog() {
    let col = collection(this.firestore, 'logsLogin');
    addDoc(col, { "fecha": new Date(), "user": this.user.nombre})
  }

  Register(){
    let col = collection(this.firestore, 'logins');
    if(this.registerNombre != "" && this.registerClave != ""){
      addDoc(col, { "user": this.registerNombre, "clave": this.registerClave});
      alert("El usuario se creo Correctamente");
      this.Login();
    }else{
      alert("Datos invalidos");
    }

    if(this.flag){
      this.router.navigate(["home"]);
    }else{ 
      alert("Algo salio mal a la hora del login, por favor intenta ingresar nuevamente");
      location.reload();
    }
  }

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
