import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Produit } from '../../models/entities';
import { ProduitService } from '../../services/produit.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-produit-form',
  templateUrl: './produit-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./produit-form.component.scss']
})
export class ProduitFormComponent implements OnInit, OnDestroy {
  @Output() submitForm = new EventEmitter<Produit>();
  @Output() cancelForm = new EventEmitter<void>();

  @ViewChild('produitForm') produitForm!: NgForm;

  @Input() mode: 'create' | 'edit' = 'create';
  @Input() produit?: Produit;

  // Données du formulaire
  produitData = {
    nom: '',
    description: '',
    prix: 0,
    categorie: 'Légumes',
    quantiteStock: 10
  };

  // États
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  message: string = '';
  isSuccess: boolean = true;
  isLoading: boolean = false;
  isSubmitted: boolean = false;

  constructor(private produitService: ProduitService,
              private router: Router) {}

  ngOnInit(): void {
    if (this.mode === 'edit' && this.produit) {
      this.loadProduitData();
    }
  }

  ngOnDestroy(): void {
    this.cleanupPreview();
  }

  /**
   * Chargement des données en mode édition
   */
  private loadProduitData(): void {
    this.produitData = {
      nom: this.produit!.nom,
      description: this.produit!.description,
      prix: this.produit!.prix,
      categorie: this.produit!.categorie || 'Légumes',
      quantiteStock: this.produit!.quantiteStock || 10
    };

    if (this.produit!.imageUrl) {
      this.previewUrl = this.produit!.imageUrl;
    }
  }

  /**
   * Soumission du formulaire
   */
  async onSubmit(): Promise<void> {
    this.isSubmitted = true;

    // Validation manuelle de l'image
    if (!this.selectedFile && this.mode === 'create') {
      this.showMessage('Veuillez sélectionner une photo', false);
      return;
    }

    // Validation du formulaire
    if (this.produitForm.invalid) {
      this.showMessage('Veuillez corriger les erreurs dans le formulaire', false);
      return;
    }

    this.isLoading = true;
    this.message = 'Enregistrement en cours...';

    try {
      let result: any;

      if (this.mode === 'create') {
        result = await this.createProduitWithImage();
      } else {
        result = await this.updateProduit();
      }

      if (result.success) {
        this.showMessage(result.message || 'Opération réussie', true);
        this.submitForm.emit(result.produit);

        // Réinitialisation en mode création
        if (this.mode === 'create') {
          setTimeout(() => {
            this.resetForm();
            this.isSubmitted = false;
          }, 2000);
        }
      } else {
        throw new Error(result.message || 'Erreur inconnue');
      }

    } catch (error: any) {
      console.error('❌ Erreur:', error);
      const errorMessage = this.handleError(error);
      this.showMessage(errorMessage, false);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Création d'un produit avec upload d'image
   */
  private async createProduitWithImage(): Promise<any> {
    if (!this.selectedFile) {
      throw new Error('Aucune image sélectionnée');
    }

    // Création du FormData
    const formData = new FormData();
    formData.append('nom', this.produitData.nom);
    formData.append('description', this.produitData.description);
    formData.append('prix', this.produitData.prix.toString());
    formData.append('categorie', this.produitData.categorie);
    formData.append('quantiteStock', this.produitData.quantiteStock.toString());
    formData.append('image', this.selectedFile);

    // Envoi de la requête
    return await lastValueFrom(
      this.produitService.createProduitWithImage(formData)
    );
  }

  /**
   * Mise à jour d'un produit (sans image)
   */
  private async updateProduit(): Promise<any> {
    const produitToUpdate: Partial<Produit> = {
      ...this.produitData,
      id: this.produit?.id
    };

    return await lastValueFrom(
      this.produitService.updateProduit(this.produit!.id!, produitToUpdate)
    );
  }

  /**
   * Sélection d'un fichier image
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    // Validation du fichier
    if (!this.validateFile(file)) {
      input.value = '';
      return;
    }

    this.selectedFile = file;
    this.createPreview(file);
    this.message = '';
  }

  /**
   * Validation d'un fichier
   */
  private validateFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    // Vérification du type
    if (!allowedTypes.includes(file.type)) {
      this.showMessage(
        `Type de fichier non supporté. Utilisez: JPEG, PNG, GIF ou WebP.`,
        false
      );
      return false;
    }

    // Vérification de la taille
    if (file.size > maxSize) {
      this.showMessage(
        `Fichier trop volumineux. Maximum: 10MB.`,
        false
      );
      return false;
    }

    return true;
  }

  /**
   * Création de la prévisualisation
   */
  private createPreview(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        this.previewUrl = e.target.result as string;
      }
    };

    reader.onerror = () => {
      console.error('Erreur de lecture du fichier');
      this.showMessage('Erreur lors de la lecture de l\'image', false);
    };

    reader.readAsDataURL(file);
  }

  /**
   * Suppression de l'image sélectionnée
   */
  removeImage(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.cleanupPreview();

    // Réinitialisation de l'input file
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  /**
   * Nettoyage de la prévisualisation
   */
  private cleanupPreview(): void {
    if (this.previewUrl && this.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.previewUrl);
    }
    this.previewUrl = null;
  }

  /**
   * Formatage de la taille du fichier
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Annulation
   */
  onCancel(): void {
    if (this.isLoading) {
      return;
    }

    const hasChanges = this.hasUnsavedChanges();

    if (hasChanges) {
      const confirmClose = window.confirm(
        'Voulez-vous vraiment annuler ? Les modifications seront perdues.'
      );
      if (!confirmClose) {
        return;
      }
    }

    // Redirection vers ListProduitComponent
    this.router.navigate(['/produits-list']); // Assure-toi que ce path est correct dans ton routing
  }



  /**
   * Vérification des changements non sauvegardés
   */
  private hasUnsavedChanges(): boolean {
    return (
      this.produitData.nom.trim() !== '' ||
      this.produitData.description.trim() !== '' ||
      this.produitData.prix !== 0 ||
      this.selectedFile !== null
    );
  }

  /**
   * Réinitialisation du formulaire
   */
  resetForm(): void {
    this.produitForm.resetForm();
    this.produitData = {
      nom: '',
      description: '',
      prix: 0,
      categorie: 'Légumes',
      quantiteStock: 10
    };
    this.removeImage();
    this.message = '';
    this.isSubmitted = false;
  }

  /**
   * Affichage d'un message
   */
  private showMessage(msg: string, success: boolean): void {
    this.message = msg;
    this.isSuccess = success;

    // Auto-disparition des messages de succès
    if (success) {
      setTimeout(() => {
        if (this.message === msg) {
          this.message = '';
        }
      }, 5000);
    }
  }

  /**
   * Gestion des erreurs
   */
  private handleError(error: any): string {
    console.error('Détails erreur:', error);

    if (error.status === 0) {
      return 'Impossible de contacter le serveur. Vérifiez: 1) Spring Boot est démarré, 2) Le port 9999 est libre';
    }

    if (error.status === 400) {
      return 'Données invalides. Vérifiez les informations saisies.';
    }

    if (error.status === 413) {
      return 'Fichier trop volumineux. Maximum 10MB.';
    }

    if (error.error?.message) {
      return error.error.message;
    }

    return 'Erreur lors de l\'enregistrement. Veuillez réessayer.';
  }

  /**
   * Getter pour le titre
   */
  get formTitle(): string {
    return this.mode === 'edit' ? 'Modifier le Produit' : 'Nouveau Produit';
  }

  /**
   * Getter pour le texte du bouton
   */
  get submitButtonText(): string {
    if (this.isLoading) {
      return this.mode === 'edit' ? 'Mise à jour...' : 'Enregistrement...';
    }
    return this.mode === 'edit' ? 'Mettre à jour' : 'Enregistrer le produit';
  }
}
