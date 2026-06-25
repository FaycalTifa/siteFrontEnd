import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {HeaderComponent} from '../../header/header.component';
import {FooterComponent} from '../../footer/footer.component';

@Component({
  selector: 'app-formations-ie',
  templateUrl: './formations-ie.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    FooterComponent
  ],
  styleUrls: ['./formations-ie.component.scss']
})
export class FormationsIEComponent implements OnInit {

  // Liste des formations IE
  formations = [
    {
      title: 'Sensibilisation sur l\'impact de l\'IE au sein de l\'entreprise',
      description: 'Découvrez comment l\'intelligence émotionnelle peut transformer votre organisation',
      duration: '1 jour',
      price: '250 000 FCFA',
      icon: 'fas fa-bell'
    },
    {
      title: 'Conscience & maîtrise de Soi',
      description: 'Apprenez à reconnaître et gérer vos émotions pour mieux les utiliser',
      duration: '2 jours',
      price: '450 000 FCFA',
      icon: 'fas fa-user-check'
    },
    {
      title: 'Gestion du stress',
      description: 'Techniques et outils pour gérer le stress au travail efficacement',
      duration: '1 jour',
      price: '250 000 FCFA',
      icon: 'fas fa-spa'
    },
    {
      title: 'Gestion des relations',
      description: 'Développez vos compétences relationnelles pour mieux collaborer',
      duration: '2 jours',
      price: '450 000 FCFA',
      icon: 'fas fa-handshake'
    },
    {
      title: 'Prévention et gestion des conflits',
      description: 'Méthodes pour prévenir et résoudre les conflits en entreprise',
      duration: '2 jours',
      price: '500 000 FCFA',
      icon: 'fas fa-comments'
    },
    {
      title: 'Leadership et engagement des équipes',
      description: 'Devenez un leader inspirant et motivez vos équipes',
      duration: '3 jours',
      price: '650 000 FCFA',
      icon: 'fas fa-crown'
    },
    {
      title: 'Renforcer la performance individuelle et collective',
      description: 'Améliorez la cohésion et la performance de vos équipes',
      duration: '2 jours',
      price: '550 000 FCFA',
      icon: 'fas fa-chart-line'
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}
