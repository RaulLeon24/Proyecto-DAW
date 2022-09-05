import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { JuegoComponent } from './juego/juego.component';
import { CarritoComponent } from './carrito/carrito.component';
import { SplashComponent } from './splash/splash.component';

const routes: Routes = [
  { path: "inicio", component: InicioComponent },
  { path: "inicio/:categoria", component: InicioComponent },
  { path: "juego/:idJuego", component: JuegoComponent },
  { path: "carrito/:idJuego", component: CarritoComponent },
  { path: "juego", component: JuegoComponent },
  { path: "carrito", component: CarritoComponent },
  { path: "load", component: AppComponent },
  { path: "splash", component: SplashComponent },
  { path: "**", redirectTo: "splash" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
