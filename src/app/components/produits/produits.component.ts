import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  editMode = false;

  constructor(private fb: FormBuilder,
              private svc: ProduitService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

  }


  }


