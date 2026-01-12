import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl = 'http://localhost:9999';

  /**
   * Corrige l'URL de l'image si nécessaire
   */
  getImageUrl(imagePath: string | undefined): string {
    if (!imagePath) {
      return this.getPlaceholderImage();
    }

    // Si l'image est déjà une URL complète
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }

    // Si c'est un chemin relatif
    if (imagePath.startsWith('/uploads/')) {
      return this.baseUrl + imagePath;
    }

    // Si c'est juste un nom de fichier
    return this.baseUrl + '/uploads/images/' + imagePath;
  }

  /**
   * URL de l'image par défaut
   */
  getPlaceholderImage(): string {
    return 'assets/images/placeholder-product.jpg';
  }

  /**
   * Vérifie si une image existe
   */
  checkImageExists(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }
}
