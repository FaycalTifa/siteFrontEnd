import { Routes } from '@angular/router';
import {ProduitsComponent} from './components/produits/produits.component';
import {AccueilComponent} from './components/acceuil/acceuil.component';
import {AboutComponent} from './components/about/about.component';
import {ContactComponent} from './components/contact/contact.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {LoginComponent} from './admin/login/login.component';
import {ProduitFormComponent} from './admin/produit-form/produit-form.component';
import {ProduitListComponent} from './admin/produit-list/produit-list.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'about', component: AboutComponent },
  { path: 'produits', component: ProduitsComponent }, // ← Cette ligne doit exister
  { path: 'produits-form', component: ProduitFormComponent }, // ← Cette ligne doit exister
  { path: 'produits-list', component: ProduitListComponent }, // ← Cette ligne doit exister
  { path: 'contact', component: ContactComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'login', component: LoginComponent }, // ✅ Route cohérente
  { path: 'accueil', component: AccueilComponent },
  { path: '**', redirectTo: '' }
];

