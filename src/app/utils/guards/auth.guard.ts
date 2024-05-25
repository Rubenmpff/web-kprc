import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate( route: ActivatedRouteSnapshot,state: RouterStateSnapshot): 
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Usamos o pipe para lidar com o valor Observable.
    return this.authService.currentUserValue.pipe(
      map(currentUser => {
        if (currentUser) {
          // Se temos um usuário atual (autenticado), permitimos a ativação da rota.
          return true;
        } else {
          // Se não tivermos um usuário autenticado, redirecionamos para a tela de login.
          // Utilizamos `returnUrl` para redirecionar o usuário de volta para a rota que ele tentou acessar após o login.
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      })
    );
  }
}