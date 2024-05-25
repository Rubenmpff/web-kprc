import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private router: Router) { }

  scrollToTopAndNavigate(route: string) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate([route]);
  }
}