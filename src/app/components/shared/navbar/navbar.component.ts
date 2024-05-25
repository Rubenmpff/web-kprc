import { Component, HostListener, Inject, Renderer2 } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  menuValue: boolean = false;
  menu_icon: string = 'bi bi-list';
  isLoggedIn$: Observable<boolean>;
  navbarFixed: boolean = false;  

  constructor(
    public authService: AuthService, 
    private router: Router, 
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    this.isLoggedIn$ = this.authService.currentUserValue.pipe(
      map(user => !!user)
    );
  }
  
  navigateTo(route: string) {
    this.closeMenu();
    this.router.navigate([route]);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    this.navbarFixed = offset > 100;
    this.navbarFixed 
      ? this.document.body.style.paddingTop = '70px' 
      : this.document.body.style.paddingTop = '0px';
  }

  toggleMenu() {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';

    if (this.menuValue) {
      this.renderer.addClass(this.document.body, 'menu-open');
    } else {
      this.renderer.removeClass(this.document.body, 'menu-open');
    }
  }

  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
    this.renderer.removeClass(this.document.body, 'menu-open');
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.closeMenu();
  }
}