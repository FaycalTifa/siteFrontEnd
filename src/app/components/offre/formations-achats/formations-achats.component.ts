import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {HeaderComponent} from '../../header/header.component';
import {FooterComponent} from '../../footer/footer.component';

@Component({
  selector: 'app-formations-achats',
  templateUrl: './formations-achats.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    FooterComponent
  ],
  styleUrls: ['./formations-achats.component.scss']
})
export class FormationsAchatsComponent implements OnInit {

  formations = [
    {
      title: 'Externalisation des Achats & Supply Chain',
      description: 'Libérez-vous des contraintes opérationnelles (achat, transport, dédouanement...). Notre équipe prend en charge l\'intégralité de votre supply chain : sourcing, négociations, suivi des commandes et logistique. Résultat : des coûts opérationnels réduits et des flux sécurisés.',
      icon: 'fas fa-bolt'
    },
    {
      title: 'Optimisation des coûts',
      description: 'Techniques avancées pour réduire vos coûts d\'achat',
      icon: 'fas fa-chart-line'
    },
    {
      title: 'Accéder à une expertise pointue',
      description: 'Développez vos compétences en négociation et sourcing',
      icon: 'fas fa-graduation-cap'
    },
    {
      title: 'Optimiser vos processus',
      description: 'Améliorez l\'efficacité de votre chaîne d\'approvisionnement',
      icon: 'fas fa-cogs'
    },
    {
      title: 'Gestion des fournisseurs',
      description: 'Stratégies pour une relation fournisseur performante',
      icon: 'fas fa-handshake'
    },
    {
      title: 'Gestion de la chaîne d\'approvisionnement',
      description: 'Maîtrisez l\'ensemble de votre supply chain',
      icon: 'fas fa-boxes'
    },
    {
      title: 'Amélioration de la performance opérationnelle',
      description: 'Optimisez vos opérations achats pour plus d\'efficacité',
      icon: 'fas fa-rocket'
    },
    {
      title: 'Gagner en flexibilité',
      description: 'Adaptez votre chaîne d\'approvisionnement aux changements',
      icon: 'fas fa-bolt'
    } ,

  ];

  constructor() { }

  ngOnInit(): void { }
}
