import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Produit } from '../../models/entities';
import { ProduitService } from '../../services/produit.service';
import { FormsModule } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload/file-upload.service';

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    FormsModule
  ],
  styleUrls: ['./produit-list.component.scss']
})
export class ProduitListComponent implements OnInit {
  produits: Produit[] = [];
  filteredProduits: Produit[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all';
  searchTerm: string = '';
  isLoading: boolean = true;

  // Pour la lightbox avec navigation
  selectedImageUrl: string | null = null;
  currentImageIndex: number = -1;

  constructor(
    private produitService: ProduitService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.isLoading = true;
    this.produitService.getProduits().subscribe({
      next: (produits) => {
        this.produits = produits.map(produit => ({
          ...produit,
          imageUrl: this.getImageUrl(produit.imageUrl || '')
        }));
        this.filteredProduits = [...this.produits];
        this.extractCategories();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur chargement produits:', error);
        this.isLoading = false;
      }
    });
  }

  extractCategories(): void {
    const uniqueCategories = new Set<string>();
    this.produits.forEach(produit => {
      if (produit.categorie) uniqueCategories.add(produit.categorie);
    });
    this.categories = Array.from(uniqueCategories);
  }

  getCategoryCount(category: string): number {
    return this.produits.filter(p => p.categorie === category).length;
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = this.produits;
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.categorie === this.selectedCategory);
    }
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.nom.toLowerCase().includes(term) ||
        (p.description && p.description.toLowerCase().includes(term))
      );
    }
    this.filteredProduits = filtered;
  }

  resetFilters(): void {
    this.selectedCategory = 'all';
    this.searchTerm = '';
    this.applyFilters();
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) return 'assets/images/placeholder-product.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads/')) return 'http://localhost:8080' + imagePath;
    return 'http://localhost:8080/uploads/images/' + imagePath;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/placeholder-product.jpg';
  }

  // Lightbox avec navigation
  openImage(url: string | undefined): void {
    if (url) {
      this.selectedImageUrl = url;
      this.currentImageIndex = this.filteredProduits.findIndex(p => p.imageUrl === url);
    }
  }

  closeImage(): void {
    this.selectedImageUrl = null;
    this.currentImageIndex = -1;
  }

  navigateImage(direction: number): void {
    const newIndex = this.currentImageIndex + direction;
    if (newIndex >= 0 && newIndex < this.filteredProduits.length) {
      this.currentImageIndex = newIndex;
      this.selectedImageUrl = this.filteredProduits[newIndex].imageUrl || null;
    }
  }

  // Méthodes pour afficher les infos formation
  getTypeIcon(type: string | undefined): string {
    const icons: { [key: string]: string } = {
      'formation': 'fas fa-chalkboard-user',
      'coaching': 'fas fa-user-graduate',
      'atelier': 'fas fa-users',
      'séminaire': 'fas fa-microphone-alt',
      'consulting': 'fas fa-chart-line'
    };
    return icons[type?.toLowerCase() || ''] || 'fas fa-graduation-cap';
  }

  getNiveauBadgeClass(niveau: string | undefined): string {
    const classes: { [key: string]: string } = {
      'Débutant': 'niveau-debutant',
      'Intermédiaire': 'niveau-intermediaire',
      'Avancé': 'niveau-avance',
      'Expert': 'niveau-expert'
    };
    return classes[niveau || ''] || 'niveau-debutant';
  }
}
