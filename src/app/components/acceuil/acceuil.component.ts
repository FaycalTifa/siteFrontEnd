import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet, RouterLink} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    FooterComponent
  ],
  styleUrls: ['./acceuil.component.scss']
})
export class AccueilComponent implements OnInit {

  // Domaines d'expertise
  expertiseItems = [
    {
      icon: 'fas fa-brain',
      title: 'Intelligence Émotionnelle',
      items: [
        'Sensibilisation sur l\'impact de l\'IE au sein de l\'entreprise',
        'Conscience & maîtrise de Soi',
        'Gestion du stress',
        'Gestion des relations',
        'Prévention et gestion des conflits',
        'Leadership et engagement des équipes',
        'Renforcer la performance individuelle et collective'
      ]
    },
    {
      icon: 'fas fa-truck',
      title: 'Achats & Approvisionnements',
      items: [
        'Optimisation des coûts',
        'Accès à une expertise pointue',
        'Optimisation de vos processus',
        'Gestion des fournisseurs',
        'Gestion de la chaîne d\'approvisionnement',
        'Amélioration de la performance opérationnelle',
        'Gain en flexibilité'
      ]
    }
  ];

  // Pourquoi nous choisir
  whyChooseUs = [
    {
      icon: 'fas fa-chart-line',
      title: 'Double expertise',
      description: 'Humaine et opérationnelle'
    },
    {
      icon: 'fas fa-bullseye',
      title: 'Approche pragmatique',
      description: 'Orientée impact'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Contexte local',
      description: 'Parfaite compréhension des réalités locales'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Engagement durable',
      description: 'Des résultats durables à vos côtés'
    }
  ];

  // Valeurs
  values = [
    {
      icon: 'fas fa-heart',
      title: 'L\'Humain au Centre',
      description: 'Placer l\'épanouissement et l\'intelligence émotionnelle au cœur de chaque transformation'
    },
    {
      icon: 'fas fa-leaf',
      title: 'L\'Engagement RSE',
      description: 'Promouvoir des pratiques d\'affaires responsables, équilibrées et respectueuses'
    },
    {
      icon: 'fas fa-chart-simple',
      title: 'L\'Excellence Opérationnelle',
      description: 'Allier rigueur stratégique, optimisation des ressources et culture du résultat'
    },
    {
      icon: 'fas fa-seedling',
      title: 'L\'Impact Durable',
      description: 'Des solutions viables qui garantissent la croissance à long terme'
    },
    {
      icon: 'fas fa-smile',
      title: 'La Bienveillance',
      description: 'Créer des environnements de travail sains tout en visant la performance globale'
    }
  ];

  // Stats
  stats = [
    { value: '80%', label: 'de la performance humaine', suffix: 'vient du QE' },
    { value: '20%', label: 'compétences intellectuelles', suffix: 'seulement' },
    { value: '24/7', label: 'Support disponible', suffix: '' },
    { value: '100%', label: 'Satisfaction garantie', suffix: '' }
  ];

  constructor() { }

  ngOnInit(): void { }
}
