import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { ClothingItem } from '../../models/clothing-item.model';
import { CATEGORIES, COLORS, SEASONS } from '../../shared/filters-categories';

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

  // Form fields
  previewImage: string | null = null;
  filterCategory = '';
  filterColor = '';
  filterSeason = '';
  itemName = '';

  // Options
  categories = CATEGORIES;
  colors = COLORS;
  seasons = SEASONS;

  constructor(private storageService: StorageService) {}

  // Initialize form if editing an existing item
  ngOnInit() {
    if (this.itemToEdit) {
      this.previewImage = this.itemToEdit.filename;
      this.filterCategory = this.itemToEdit.category;
      this.filterColor = this.itemToEdit.colorTag ?? '';
      this.filterSeason = this.itemToEdit.season ?? '';
      this.itemName = this.capitalizeFirstLetter(this.itemToEdit.name ?? '');
    }
  }

  // Helper to capitalize first letter
  capitalizeFirstLetter(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

// Handle file selection and preview
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => this.previewImage = reader.result as string;
    reader.readAsDataURL(file);
  }

  // Save or update the clothing item
  saveItem() {
    if (!this.previewImage || !this.filterCategory || !this.filterColor || !this.filterSeason) {
      alert('Complete all fields before saving.');
      return;
    }

    // Format item name
    const formattedName = this.capitalizeFirstLetter(
      this.itemName || 'Unnamed item'
    );

    if (this.itemToEdit) {
      this.storageService.updateItem({
        ...this.itemToEdit,
        name: formattedName,
        category: this.filterCategory,
        colorTag: this.filterColor,
        season: this.filterSeason,
        filename: this.previewImage
      });
    } else {
      this.storageService.addItem({
        name: formattedName,
        filename: this.previewImage,
        category: this.filterCategory,
        colorTag: this.filterColor,
        season: this.filterSeason
      });
    }

    this.close.emit(true);
  }

  // Cancel and close the modal
  cancel() {
    this.close.emit(false);
  }
}
