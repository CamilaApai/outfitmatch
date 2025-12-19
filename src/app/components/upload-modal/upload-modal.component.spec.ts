import { Component, EventEmitter, Output, Input } from '@angular/core';
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

// UploadModalComponent allows users to upload and categorize clothing items.
export class UploadModalComponent {
  @Input() itemToEdit?: ClothingItem;
  @Output() close = new EventEmitter<boolean>();

  // State variables for the component
  previewImage: string | null = null;
  selectedCategory = '';
  selectedColor = '';
  selectedSeason = '';
  itemName = '';
  constructor(private storageService: StorageService) { }

  // Handles file selection and generates a preview image.
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    //  Generate a preview of the selected image
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // Saves the new clothing item to storage.
  saveItem() {
    if (
      !this.previewImage ||
      !this.selectedCategory ||
      !this.selectedColor ||
      !this.selectedSeason
    ) {
      alert('Complete all fields');
      return;
    }

    //  Add the new item to storage
    this.storageService.addItem({
      filename: this.previewImage,
      category: this.selectedCategory,
      colorTag: this.selectedColor,
      season: this.selectedSeason,
      name: this.itemName || 'Unnamed item',
      isDefault: false
    });

    this.close.emit(true);
  }

  // Cancels the upload and closes the modal.
  cancel() {
    this.close.emit(false);
  }
}
