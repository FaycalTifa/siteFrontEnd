import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Produit } from '../../models/entities';
import { ProduitService } from '../../services/produit.service';
import { Router } from '@angular/router';

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
    duree: '',
    categorie: 'Intelligence Émotionnelle',
    type: 'formation',
    niveau: 'Débutant',
    prerequis: '',
    objectifs: '',
    programme: '',
    publicCible: ''
  };

  // Catégories avec icônes
  categories = [
    { value: 'Intelligence Émotionnelle', label: '🧠 Intelligence Émotionnelle', icon: 'fas fa-brain' },
    { value: 'Achats & Approvisionnements', label: '📦 Achats & Approvisionnements', icon: 'fas fa-truck' },
    { value: 'Leadership', label: '👔 Leadership', icon: 'fas fa-crown' },
    { value: 'Gestion du Stress', label: '😌 Gestion du Stress', icon: 'fas fa-leaf' },
    { value: 'Communication', label: '💬 Communication', icon: 'fas fa-comments' },
    { value: 'Négociation', label: '🤝 Négociation', icon: 'fas fa-handshake' }
  ];

  niveaux = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];
  types = ['Formation', 'Coaching', 'Atelier', 'Séminaire', 'Consulting'];

  // États
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  message: string = '';
  isSuccess: boolean = true;
  isLoading: boolean = false;
  isSubmitted: boolean = false;
  showSuccessNotification: boolean = false;
  successMessage: string = '';

  constructor(
    private produitService: ProduitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initFormData();
    if (this.mode === 'edit' && this.produit) {
      this.loadProduitData();
    }
  }

  initFormData(): void {
    this.produitData = {
      nom: '',
      description: '',
      prix: 0,
      duree: '',
      categorie: 'Intelligence Émotionnelle',
      type: 'formation',
      niveau: 'Débutant',
      prerequis: '',
      objectifs: '',
      programme: '',
      publicCible: ''
    };
  }

  ngOnDestroy(): void {
    this.cleanupPreview();
  }

  private loadProduitData(): void {
    if (!this.produit) return;

    this.produitData = {
      nom: this.produit.nom || '',
      description: this.produit.description || '',
      prix: this.produit.prix || 0,
      duree: (this.produit as any).duree || '',
      categorie: this.produit.categorie || 'Intelligence Émotionnelle',
      type: (this.produit as any).type || 'formation',
      niveau: (this.produit as any).niveau || 'Débutant',
      prerequis: (this.produit as any).prerequis || '',
      objectifs: (this.produit as any).objectifs || '',
      programme: (this.produit as any).programme || '',
      publicCible: (this.produit as any).publicCible || ''
    };

    if (this.produit.imageUrl) {
      this.previewUrl = this.produit.imageUrl;
    }
  }

  // Vérifier si le formulaire est valide
  isFormValid(): boolean {
    return (this.produitData.nom?.trim() || '') !== '' &&
      (this.produitData.description?.trim() || '') !== '' &&
      this.produitData.prix > 0 &&
      (this.produitData.duree?.trim() || '') !== '' &&
      (this.mode === 'edit' || this.selectedFile !== null);
  }

  async onSubmit(): Promise<void> {
    this.isSubmitted = true;

    if (!this.isFormValid()) {
      let errorMsg = 'Veuillez remplir tous les champs obligatoires :\n';
      if (!this.produitData.nom?.trim()) errorMsg += '- Titre de la formation\n';
      if (!this.produitData.description?.trim()) errorMsg += '- Description\n';
      if (this.produitData.prix <= 0) errorMsg += '- Prix valide\n';
      if (!this.produitData.duree?.trim()) errorMsg += '- Durée\n';
      if (this.mode === 'create' && !this.selectedFile) errorMsg += '- Image\n';
      this.showMessage(errorMsg, false);
      return;
    }

    this.isLoading = true;
    this.message = 'Enregistrement en cours...';

    try {
      let result: any;

      if (this.mode === 'create') {
        result = await this.createFormation();
      } else {
        result = await this.updateFormation();
      }

      if (result && result.success) {
        this.showSuccessNotification = true;
        this.successMessage = this.mode === 'create'
          ? '✅ Formation créée avec succès !'
          : '✅ Formation mise à jour avec succès !';

        this.submitForm.emit(result.produit);

        if (this.mode === 'create') {
          setTimeout(() => {
            this.resetForm();
            this.isSubmitted = false;
            setTimeout(() => {
              this.showSuccessNotification = false;
            }, 3000);
          }, 2000);
        } else {
          setTimeout(() => {
            this.showSuccessNotification = false;
            this.router.navigate(['/produits-list']);
          }, 2000);
        }
      } else {
        throw new Error(result?.message || 'Erreur inconnue');
      }

    } catch (error: any) {
      console.error('❌ Erreur:', error);
      this.showMessage(this.handleError(error), false);
    } finally {
      this.isLoading = false;
    }
  }

  private async createFormation(): Promise<any> {
    if (!this.selectedFile) {
      throw new Error('Aucune image sélectionnée');
    }

    const formData = new FormData();
    formData.append('nom', this.produitData.nom);
    formData.append('description', this.produitData.description);
    formData.append('prix', this.produitData.prix.toString());
    formData.append('categorie', this.produitData.categorie);
    formData.append('quantiteStock', '10');
    formData.append('duree', this.produitData.duree);
    formData.append('type', this.produitData.type);
    formData.append('niveau', this.produitData.niveau);
    formData.append('prerequis', this.produitData.prerequis || '');
    formData.append('objectifs', this.produitData.objectifs || '');
    formData.append('programme', this.produitData.programme || '');
    formData.append('publicCible', this.produitData.publicCible || '');
    formData.append('image', this.selectedFile);

    return await lastValueFrom(
      this.produitService.createProduitWithImage(formData)
    );
  }

  private async updateFormation(): Promise<any> {
    const produitToUpdate: Partial<Produit> = {
      ...this.produitData,
      id: this.produit?.id,
      quantiteStock: 10
    };

    return await lastValueFrom(
      this.produitService.updateProduit(this.produit!.id!, produitToUpdate)
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    if (!this.validateFile(file)) {
      input.value = '';
      return;
    }

    this.selectedFile = file;
    this.createPreview(file);
    this.message = '';
  }

  private validateFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      this.showMessage('Type de fichier non supporté. Utilisez: JPEG, PNG, GIF ou WebP.', false);
      return false;
    }

    if (file.size > maxSize) {
      this.showMessage('Fichier trop volumineux. Maximum: 10MB.', false);
      return false;
    }

    return true;
  }

  private createPreview(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        this.previewUrl = e.target.result as string;
      }
    };

    reader.onerror = () => {
      this.showMessage('Erreur lors de la lecture de l\'image', false);
    };

    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.cleanupPreview();

    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  private cleanupPreview(): void {
    if (this.previewUrl && this.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.previewUrl);
    }
    this.previewUrl = null;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // CORRECTION DE LA MÉTHODE hasUnsavedChanges
  private hasUnsavedChanges(): boolean {
    const nom = this.produitData.nom ?? '';
    const description = this.produitData.description ?? '';
    const duree = this.produitData.duree ?? '';

    return nom.trim() !== '' ||
      description.trim() !== '' ||
      this.produitData.prix !== 0 ||
      duree.trim() !== '' ||
      this.selectedFile !== null;
  }

  // CORRECTION DE LA MÉTHODE onCancel
  onCancel(): void {
    if (this.isLoading) return;

    // Vérifier si des modifications ont été faites
    const hasChanges = this.hasUnsavedChanges();

    if (hasChanges && this.mode === 'create') {
      const confirmClose = window.confirm(
        'Voulez-vous vraiment annuler ? Les modifications seront perdues.'
      );
      if (!confirmClose) return;
    }

    // Émettre l'événement d'annulation
    this.cancelForm.emit();
    // Rediriger vers la liste
    this.router.navigate(['/produits-list']);
  }

  resetForm(): void {
    this.initFormData();
    this.removeImage();
    this.message = '';
    this.isSubmitted = false;
    if (this.produitForm) {
      this.produitForm.resetForm();
    }
  }

  private showMessage(msg: string, success: boolean): void {
    this.message = msg;
    this.isSuccess = success;

    if (!success) {
      setTimeout(() => {
        if (this.message === msg) {
          this.message = '';
        }
      }, 5000);
    }
  }

  private handleError(error: any): string {
    if (error.status === 0) {
      return 'Impossible de contacter le serveur. Vérifiez que Spring Boot est démarré.';
    }
    if (error.status === 400) {
      return 'Données invalides. Vérifiez les informations saisies.';
    }
    if (error.status === 413) {
      return 'Fichier trop volumineux. Maximum 10MB.';
    }
    return error.error?.message || 'Erreur lors de l\'enregistrement. Veuillez réessayer.';
  }

  closeSuccessNotification(): void {
    this.showSuccessNotification = false;
  }

  get formTitle(): string {
    return this.mode === 'edit' ? 'Modifier la Formation' : 'Nouvelle Formation';
  }

  get submitButtonText(): string {
    if (this.isLoading) {
      return this.mode === 'edit' ? 'Mise à jour...' : 'Enregistrement...';
    }
    return this.mode === 'edit' ? 'Mettre à jour' : 'Publier la formation';
  }

  getCategoryIcon(categoryValue: string): string {
    const cat = this.categories.find(c => c.value === categoryValue);
    return cat?.icon || 'fas fa-graduation-cap';
  }
}
