import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-acceuil',
   templateUrl: './acceuil.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  styleUrl: './acceuil.component.scss',

})
export class AccueilComponent implements OnInit {
  features = [
    {
      icon: 'fas fa-shipping-fast',
      title: 'Livraison Rapide',
      description: 'Livraison express sous 48h'
    },
    {
      icon: 'fas fa-award',
      title: 'Qualité Garantie',
      description: 'Produits de haute qualité'
    },
    {
      icon: 'fas fa-headset',
      title: 'Support 24/7',
      description: 'Notre équipe à votre écoute'
    }
  ];

  testimonials = [
    {
      name: 'Marie D.',
      comment: 'Service exceptionnel et produits de qualité!',
      rating: 5
    },
    {
      name: 'Pierre L.',
      comment: 'Livraison rapide et professionnelle.',
      rating: 4
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  hoverCard(event: any) {
    event.target.style.transform = 'scale(1.05)';
  }

  leaveCard(event: any) {
    event.target.style.transform = 'scale(1)';
  }
}


