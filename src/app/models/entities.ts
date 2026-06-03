

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  username?: string;
  role?: string;
  message: string;
}

// produit.model.ts
export class Produit {
  id?: number;
  nom: string = '';
  description: string = '';
  prix: number = 0;
  imageUrl?: string;
  categorie: string = '';
  enPromotion: boolean = false;
  prixPromotion?: number | null;
  enStock: boolean = true;
  quantiteStock: number = 0;
  dateCreation?: string;
  dateModification?: string;

  // Nouveaux champs pour les formations
  duree?: string = '';
  type?: string = 'formation';
  niveau?: string = 'Débutant';
  prerequis?: string = '';
  objectifs?: string = '';
  programme?: string = '';
  publicCible?: string = '';

  constructor(data?: Partial<Produit>) {
    Object.assign(this, data);
  }
}
