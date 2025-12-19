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
export class UploadModalComponent {

  @Input() itemToEdit?: ClothingItem;
  @Output() close = new EventEmitter<boolean>();

  previewImage: string | null = null;
  selectedCategory = '';
  selectedColor = '';
  selectedSeason = '';
  itemName = '';

  constructor(private storageService: StorageService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

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

  cancel() {
    this.close.emit(false);
  }
}
