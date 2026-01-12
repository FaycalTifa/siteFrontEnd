import {Component, OnInit} from '@angular/core';

import {LoginRequest} from '../../models/entities';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../../components/header/header.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {FormsModule} from '@angular/forms';
import {LoginService} from '../../services/login/login.service';



@Component({
  selector: './login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    FormsModule
  ],
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{
  credentials: LoginRequest = {
    username: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';
  apiStatus = '';

  constructor(
    private authService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkApiStatus();

    // Si déjà connecté, rediriger vers produits
    /*if (this.authService.isLoggedIn()) {
      this.router.navigate(['/produits']);
    }*/
  }

  checkApiStatus(): void {
    this.authService.checkApiStatus().subscribe({
      next: (status) => {
        this.apiStatus = `✅ ${status}`;
        console.log('Statut API:', status);
      },
      error: (error) => {
        this.apiStatus = '❌ API non accessible - Vérifiez Spring Boot';
        console.error('Erreur API:', error);
      }
    });
  }

  login(): void {
    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    console.log('🔄 Tentative de connexion...', this.credentials);

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Réponse login:', response);

        if (response.success) {
          console.log('✅ Connexion réussie, redirection vers produits...');
          this.router.navigate(['/produits-form']);
        } else {
          this.errorMessage = response.message || 'Erreur de connexion';
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('❌ Erreur HTTP:', error);
        this.errorMessage = 'Erreur de connexion au serveur. Vérifiez que Spring Boot est démarré.';
      }
    });
  }

  // Méthode pour connexion rapide (debug)
  quickLogin(username: string, password: string): void {
    this.credentials = { username, password };
    this.login();
  }
}


