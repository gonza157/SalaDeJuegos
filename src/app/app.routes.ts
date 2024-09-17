import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { HomeComponent } from '../components/home/home.component';
import { QuienSoyComponent } from '../components/quien-soy/quien-soy.component';

export const routes: Routes = [
    {path: "", redirectTo: "/login", pathMatch: "full"},
    {path: "login", component: LoginComponent},
    {path: "home", component: HomeComponent, 
        children: [
            {
                path: "quiensoy",
                component: QuienSoyComponent
            }
        ]
    },
    {path: "**", component: PageNotFoundComponent}
];
