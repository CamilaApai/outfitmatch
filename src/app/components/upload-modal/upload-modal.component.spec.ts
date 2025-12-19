// upload-modal.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-upload-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.css']
})
export class UploadModalComponent {
cancel: any;
cancel() {
throw new Error('Method not implemented.');
}
COLORS: any;
  selectedSeason: any;
itemName: any;
itemToEdit: any;
cancel() {
throw new Error('Method not implemented.');
}
  @Output() close = new EventEmitter<void>();

  previewImage: string | null = null;
  selectedCategory = '';
  selectedColor = '';

  constructor(private storageService: StorageService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => this.previewImage = reader.result as string;
    reader.readAsDataURL(file);
  }

  saveItem() {
    if (!this.previewImage || !this.selectedCategory || !this.selectedColor || !this.selectedSeason) {
      alert('Complete all fields');
      return;
    }

    this.storageService.addItem({
      filename: this.previewImage,
      category: this.selectedCategory,
      colorTag: this.selectedColor,
      season: this.selectedSeason,
      name: this.selectedCategory + ' Item',
      isDefault: false
    });

    alert('Item saved ✔');
    this.close.emit();
  }
}
