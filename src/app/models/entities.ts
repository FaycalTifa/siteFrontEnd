

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

export interface Produit {
  id?: number;
  nom: string;
  description: string;
  prix: number;
  imageUrl: string;
  categorie?: string; // ✅ Rendre optionnelle avec ?
  enPromotion?: boolean;
  prixPromotion?: number;
  enStock?: boolean;
  quantiteStock?: number;
  dateCreation?: string;
  dateModification?: string;
}
