import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    RouterLink,        // ✅ Nécessaire pour routerLink
    RouterLinkActive,   // ✅ Nécessaire pour routerLinkActive
    FooterComponent
  ],
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  ngOnInit(): void { }
}


