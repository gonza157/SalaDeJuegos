import { Component } from '@angular/core';
import UsuarioModel from '../../app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  constructor( private router: Router ,private activatedRoute: ActivatedRoute) {  }

  ngOnInit():void{
    const userString = JSON.stringify(this.users);
    localStorage.setItem("users", userString);
  }
  Inicio():void {    
    if(this.GetUser()){
      this.router.navigate(["home"]);
    }else{
      alert("Usuario o clave incorrecta");
    }
  }

  GetUsers(): void{
    const strUser = localStorage.getItem("users");

    this.users = JSON.parse(strUser!);
  }

  GetUser(): boolean{
    this.GetUsers();
    let flag = false;
    for (let i = 0; i < this.users.length; i++) {
      if(this.users[i].nombre == this.user.nombre && this.users[i].clave == this.user.clave){
        flag = true;
      } 
    }
    return flag;
  }

 
}
