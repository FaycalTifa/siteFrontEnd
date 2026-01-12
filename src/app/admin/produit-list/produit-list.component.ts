import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
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
  imageStatus: Map<number, boolean> = new Map();

  // Pour la lightbox
  selectedImageUrl: string | null = null;

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
          imageUrl: this.getImageUrl(produit.imageUrl)
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
        p.description.toLowerCase().includes(term)
      );
    }
    this.filteredProduits = filtered;
  }

  // Obtenir URL complète de l'image
  getImageUrl(imagePath: string | undefined): string {
    if (!imagePath) return 'assets/images/placeholder-product.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads/')) return 'http://localhost:9999' + imagePath;
    return 'http://localhost:9999/uploads/images/' + imagePath;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/placeholder-product.jpg';
  }

  // ========================
  // Lightbox
  // ========================
  openImage(url: string): void {
    this.selectedImageUrl = url;
  }

  closeImage(): void {
    this.selectedImageUrl = null;
  }
}
