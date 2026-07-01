import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

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
export class AccueilComponent implements OnInit, OnDestroy {

  // Images du carrousel
  carouselItems = [
    { image: 'assets/images/image1.jpg', title: 'Intelligence Émotionnelle', description: 'Développez votre quotient émotionnel pour un leadership d\'excellence' },
    { image: 'assets/images/image2.jpg', title: 'Leadership & Management', description: 'Devenez un leader inspirant et motivez vos équipes' },
    { image: 'assets/images/image3.jpg', title: 'Achats & Approvisionnements', description: 'Optimisez votre chaîne logistique et réduisez vos coûts' },
    { image: 'assets/images/image4.jpg', title: 'Coaching Personnalisé', description: 'Un accompagnement sur mesure pour atteindre vos objectifs' },
    { image: 'assets/images/image5.png', title: 'Coaching Personnalisé', description: 'Un accompagnement sur mesure pour atteindre vos objectifs' }
  ];

  // Pour le carrousel circulaire, on duplique les items pour créer un effet infini
  carouselItemsInfinite: any[] = [];

  currentIndex: number = 0;
  slidesToShow: number = 3;  // 3 images visibles
  slideInterval: any;
  totalSlides: number = 4;
  isAnimating: boolean = false;

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
    { icon: 'fas fa-chart-line', title: 'Double expertise', description: 'Humaine et opérationnelle' },
    { icon: 'fas fa-bullseye', title: 'Approche pragmatique', description: 'Orientée impact' },
    { icon: 'fas fa-map-marker-alt', title: 'Contexte local', description: 'Parfaite compréhension des réalités locales' },
    { icon: 'fas fa-handshake', title: 'Engagement durable', description: 'Des résultats durables à vos côtés' }
  ];

  // Valeurs
  values = [
    { icon: 'fas fa-heart', title: 'L\'Humain au Centre', description: 'Placer l\'épanouissement et l\'intelligence émotionnelle au cœur de chaque transformation' },
    { icon: 'fas fa-leaf', title: 'L\'Engagement RSE', description: 'Promouvoir des pratiques d\'affaires responsables, équilibrées et respectueuses' },
    { icon: 'fas fa-chart-simple', title: 'L\'Excellence Opérationnelle', description: 'Allier rigueur stratégique, optimisation des ressources et culture du résultat' },
    { icon: 'fas fa-seedling', title: 'L\'Impact Durable', description: 'Des solutions viables qui garantissent la croissance à long terme' },
    { icon: 'fas fa-smile', title: 'La Bienveillance', description: 'Créer des environnements de travail sains tout en visant la performance globale' }
  ];

  // Stats
  stats = [
    { value: '80%', label: 'de la performance humaine', suffix: 'vient du QE' },
    { value: '20%', label: 'compétences intellectuelles', suffix: 'seulement' },
    { value: '24/7', label: 'Support disponible', suffix: '' },
    { value: '100%', label: 'Satisfaction garantie', suffix: '' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Créer un tableau infini en dupliquant les items
    this.carouselItemsInfinite = [...this.carouselItems, ...this.carouselItems];
    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.stopCarousel();
    this.animateCircles();
  }

  animateCircles(): void {
    // Attendre que le DOM soit chargé
    setTimeout(() => {
      const circles = document.querySelectorAll('.circle');

      circles.forEach((circle, index) => {
        const element = circle as HTMLElement;

        // Durée aléatoire entre 8 et 25 secondes
        const duration = 8 + Math.random() * 17;

        // Position aléatoire
        const x = (Math.random() - 0.5) * 150;
        const y = (Math.random() - 0.5) * 150;

        // Délai d'animation pour éviter que tout bouge en même temps
        const delay = index * 0.3;

        // Appliquer les styles
        element.style.animation = 'none';
        // Force reflow
        element.offsetHeight;

        element.style.setProperty('--x', x + 'px');
        element.style.setProperty('--y', y + 'px');
        element.style.animation = `floatRandom ${duration}s ease-in-out ${delay}s infinite`;
      });
    }, 100);
  }

  startCarousel(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopCarousel(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;

    this.currentIndex++;

    // Réinitialiser pour l'effet infini
    setTimeout(() => {
      if (this.currentIndex >= this.totalSlides) {
        this.currentIndex = 0;
      }
      this.isAnimating = false;
    }, 500);
  }

  prevSlide(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;

    this.currentIndex--;

    setTimeout(() => {
      if (this.currentIndex < 0) {
        this.currentIndex = this.totalSlides - 1;
      }
      this.isAnimating = false;
    }, 500);
  }

  goToSlide(index: number): void {
    if (this.isAnimating || index === this.currentIndex) return;
    this.isAnimating = true;
    this.currentIndex = index;
    this.stopCarousel();
    this.startCarousel();
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  // Calculer la position du slide (pourcentage)
  getTranslateX(): number {
    return -(this.currentIndex * (100 / this.slidesToShow));
  }
}
