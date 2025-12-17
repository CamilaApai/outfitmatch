//import { Component } from '@angular/core';
//
//@Component({
//  selector: 'app-upload-modal',
//  imports: [],
//  templateUrl: './upload-modal.component.html',
//  styleUrl: './upload-modal.component.css'
//})
//export class UploadModalComponent {
//
//}

import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { ClothingItem } from '../../models/clothing-item.model';

@Component({
  selector: 'app-upload-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.css']
})
export class UploadModalComponent implements OnInit {

  @Input() itemToEdit?: ClothingItem;
  @Output() close = new EventEmitter<boolean>();

  previewImage: string | null = null;
  selectedCategory = '';
  selectedColor = '';
  selectedSeason = '';
  itemName = '';

  readonly COLORS = [
    'black','white','gray','brown','beige',
    'red','blue','green','pink','yellow','purple'
  ];

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    if (this.itemToEdit) {
      this.previewImage = this.itemToEdit.filename;
      this.selectedCategory = this.itemToEdit.category;
      this.selectedColor = this.itemToEdit.colorTag ?? '';
      this.selectedSeason = this.itemToEdit.season ?? '';
      this.itemName = this.itemToEdit.name ?? '';
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => this.previewImage = reader.result as string;
    reader.readAsDataURL(file);
  }

  saveItem() {
    if (!this.previewImage || !this.selectedCategory || !this.selectedColor || !this.selectedSeason) {
      alert('Completa todos los campos');
      return;
    }

    if (this.itemToEdit) {
      // ✏️ EDITAR ITEM
      this.storageService.updateItem({
        ...this.itemToEdit,
        name: this.itemName,
        category: this.selectedCategory,
        colorTag: this.selectedColor,
        season: this.selectedSeason,
        filename: this.previewImage
      });
    } else {
      // ➕ CREAR ITEM
      this.storageService.addItem({
        name: this.itemName || 'Unnamed item',
        filename: this.previewImage, // ahora seguro es string
        category: this.selectedCategory,
        colorTag: this.selectedColor,
        season: this.selectedSeason
      });
    }

    this.close.emit(true);
  }

  cancel() {
    this.close.emit(false);
  }
}
