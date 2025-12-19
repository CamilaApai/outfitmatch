import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { ClothingItem } from '../../models/clothing-item.model';

// Modal for uploading or editing clothing items
@Component({
  selector: 'app-upload-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.css']
})

// UploadModalComponent class
export class UploadModalComponent implements OnInit {
  @Input() itemToEdit?: ClothingItem;
  @Output() close = new EventEmitter<boolean>();

  // Form fields
  previewImage: string | null = null;
  selectedCategory = '';
  selectedColor = '';
  selectedSeason = '';
  itemName = '';
  constructor(private storageService: StorageService) { }

  // Helper to capitalize first letter
  capitalizeFirstLetter(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  ngOnInit() {
    if (this.itemToEdit) {
      // Pre-fill fields for editing
      this.previewImage = this.itemToEdit.filename;
      this.selectedCategory = this.itemToEdit.category;
      this.selectedColor = this.itemToEdit.colorTag ?? '';
      this.selectedSeason = this.itemToEdit.season ?? '';

      // Capitalize name for display
      this.itemName = this.capitalizeFirstLetter(
        this.itemToEdit.name ?? ''
      );
    }
  }

  // Handle file selection and preview
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    // Preview image
    const reader = new FileReader();
    reader.onload = () => this.previewImage = reader.result as string;
    reader.readAsDataURL(file);
  }

  // Save or update clothing item
  saveItem() {
    if (!this.previewImage || !this.selectedCategory || !this.selectedColor || !this.selectedSeason) {
      alert('Complete all fields before saving.');
      return;
    }
    const formattedName = this.capitalizeFirstLetter(
      this.itemName || 'Unnamed item'
    );
    // Save or update item in storage
    if (this.itemToEdit) {
      this.storageService.updateItem({
        ...this.itemToEdit,
        name: formattedName,
        category: this.selectedCategory,
        colorTag: this.selectedColor,
        season: this.selectedSeason,
        filename: this.previewImage
      });
    } else {
      // New item
      this.storageService.addItem({
        name: formattedName,
        filename: this.previewImage,
        category: this.selectedCategory,
        colorTag: this.selectedColor,
        season: this.selectedSeason
      });
    }
    // Close modal and indicate success
    this.close.emit(true);
  }
  // Cancel and close modal without saving
  cancel() { this.close.emit(false); };
}
