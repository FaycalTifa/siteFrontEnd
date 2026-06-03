import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    FormsModule
  ],
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  formData = {
    name: '',
    email: '',
    phone: '',
    subject: 'information',
    message: ''
  };

  isSubmitting = false;
  newsletterEmail = '';
  activeFaq: number = -1;

  faqs = [
    {
      question: 'Quels types de formations proposez-vous ?',
      answer: 'Nous proposons des formations en Intelligence Émotionnelle (conscience de soi, gestion du stress, leadership) et en Achats & Approvisionnements (optimisation des coûts, gestion fournisseurs, négociation).'
    },
    {
      question: 'Comment se déroulent vos formations ?',
      answer: 'Nos formations sont disponibles en présentiel dans nos bureaux, en intra-entreprise sur site, ou en distanciel via nos plateformes en ligne. Chaque formation est personnalisée selon vos besoins.'
    },
    {
      question: 'Quels sont les tarifs de vos prestations ?',
      answer: 'Nos tarifs varient selon le type de formation, la durée et le format (individuel ou groupe). Nous vous invitons à nous contacter pour un devis personnalisé et sans engagement.'
    },
    {
      question: 'Proposez-vous des certifications ?',
      answer: 'Oui, toutes nos formations sont certifiantes. À l\'issue de chaque formation, un certificat de réalisation vous est délivré, attestant des compétences acquises.'
    },
    {
      question: 'Comment puis-je m\'inscrire à une formation ?',
      answer: 'Vous pouvez vous inscrire directement via notre formulaire de contact, par téléphone, ou en nous envoyant un email. Notre équipe vous accompagnera dans le processus d\'inscription.'
    },
    {
      question: 'Proposez-vous des formations sur mesure ?',
      answer: 'Absolument ! Nous concevons des programmes sur mesure adaptés à vos objectifs spécifiques, à votre secteur d\'activité et à vos contraintes organisationnelles.'
    }
  ];

  onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.message) {
      this.isSubmitting = true;
      // Simuler l'envoi
      setTimeout(() => {
        console.log('Formulaire soumis:', this.formData);
        alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
        this.formData = { name: '', email: '', phone: '', subject: 'information', message: '' };
        this.isSubmitting = false;
      }, 1500);
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }

  onSubscribe() {
    if (this.newsletterEmail) {
      console.log('Newsletter subscription:', this.newsletterEmail);
      alert('Merci pour votre inscription à notre newsletter !');
      this.newsletterEmail = '';
    }
  }

  toggleFaq(index: number) {
    this.activeFaq = this.activeFaq === index ? -1 : index;
  }
}
