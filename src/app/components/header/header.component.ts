import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FooterComponent
  ],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenuOpen = false;
  mobileOffresOpen = false;
  isDropdownOpen = false;  // Nouvelle variable pour le dropdown desktop

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      this.mobileOffresOpen = false;
    }
  }

  toggleMobileOffres() {
    this.mobileOffresOpen = !this.mobileOffresOpen;
  }

  // Nouvelle méthode pour toggler le dropdown desktop
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Fermer le dropdown quand on clique sur un lien
  closeDropdown() {
    this.isDropdownOpen = false;
  }

  ngOnInit(): void { }
}
