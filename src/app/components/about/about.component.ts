import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet, RouterLink} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    FooterComponent
  ],
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  // Statistiques
  stats = [
    { value: '15+', label: 'Années d\'expertise', icon: 'fas fa-calendar-alt' },
    { value: '500+', label: 'Entreprises accompagnées', icon: 'fas fa-building' },
    { value: '98%', label: 'Taux de satisfaction', icon: 'fas fa-smile' },
    { value: '50+', label: 'Formations proposées', icon: 'fas fa-graduation-cap' }
  ];

  // Valeurs
  values = [
    {
      icon: 'fas fa-heart',
      title: 'Humain au Centre',
      description: 'Placer l\'épanouissement et l\'intelligence émotionnelle au cœur de chaque transformation',
      color: '#2c5530'
    },
    {
      icon: 'fas fa-leaf',
      title: 'Engagement RSE',
      description: 'Promouvoir des pratiques d\'affaires responsables et respectueuses',
      color: '#4a7c59'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Excellence Opérationnelle',
      description: 'Allier rigueur stratégique, optimisation des ressources et culture du résultat',
      color: '#8fb996'
    },
    {
      icon: 'fas fa-seedling',
      title: 'Impact Durable',
      description: 'Des solutions viables qui garantissent la croissance à long terme',
      color: '#2c5530'
    },
    {
      icon: 'fas fa-hand-holding-heart',
      title: 'Bienveillance',
      description: 'Créer des environnements de travail sains tout en visant la performance globale',
      color: '#4a7c59'
    }
  ];

  // Équipe
  teamMembers = [
    {
      name: 'Jean Dupont',
      role: 'Directeur Général',
      description: 'Expert en intelligence émotionnelle et en développement du leadership',
      image: 'assets/images/team1.jpg',
      icon: 'fas fa-user-tie'
    },
    {
      name: 'Marie Koné',
      role: 'Responsable Pédagogique',
      description: 'Spécialiste en formation et en développement des compétences',
      image: 'assets/images/team2.jpg',
      icon: 'fas fa-chalkboard-user'
    },
    {
      name: 'Amadou Traoré',
      role: 'Expert Achats & Supply Chain',
      description: 'Optimisation des processus et gestion des fournisseurs',
      image: 'assets/images/team3.jpg',
      icon: 'fas fa-truck'
    }
  ];

  // Domaines d'expertise
  expertiseAreas = [
    {
      title: 'Intelligence Émotionnelle',
      description: 'Développement du capital humain et leadership',
      features: ['Conscience de soi', 'Gestion des émotions', 'Empathie', 'Aptitudes sociales']
    },
    {
      title: 'Achats & Approvisionnements',
      description: 'Optimisation de la chaîne d\'approvisionnement',
      features: ['Négociation', 'Gestion fournisseurs', 'Réduction des coûts', 'Performance opérationnelle']
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}
