import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { ClothingItem } from '../../models/clothing-item.model';
import { Outfit } from '../../models/outfit.model';

@Component({
  selector: 'app-outfit-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './outfit-builder.component.html',
  styleUrls: ['./outfit-builder.component.css']
})
export class BuildOutfitComponent {

  getItemImage(itemId: string): string {
    const item = this.clothingItems.find(i => i.id === itemId);
    return item?.filename || '';
  }

  
  clothingItems: ClothingItem[] = [];
  outfits: Outfit[] = [];

  selectedItems: string[] = [];
  newOutfitName: string = '';

  showUploadModal = false;
  editingOutfit: Outfit | null = null;

  constructor(private storage: StorageService) {
    this.loadData();
  }

  loadData() {
    this.clothingItems = this.storage.loadItems();
    this.outfits = this.storage.loadOutfits();
  }

  // Selección de items
  toggleSelection(itemId: string) {
    if (this.selectedItems.includes(itemId)) {
      this.selectedItems = this.selectedItems.filter(id => id !== itemId);
    } else {
      this.selectedItems.push(itemId);
    }
  }

  // Crear o actualizar outfit
  createOutfit() {
    if (!this.selectedItems.length || !this.newOutfitName.trim()) {
      alert('Choose some items and provide a name for the outfit.');
      return;
    }

    if (this.editingOutfit) {
      // editar
      this.editingOutfit.itemIds = [...this.selectedItems];
      this.editingOutfit.name = this.newOutfitName;
      this.storage.updateOutfit(this.editingOutfit);
      this.editingOutfit = null;
    } else {
      // crear
      this.storage.addOutfit(this.selectedItems, this.newOutfitName);
    }

    this.newOutfitName = '';
    this.selectedItems = [];
    this.loadData();
  }

  editOutfit(outfit: Outfit) {
    this.editingOutfit = outfit;
    this.newOutfitName = outfit.name ?? '';
    this.selectedItems = [...outfit.itemIds];
  }

  deleteOutfit(id: string) {
    if (!confirm('Do you want to delete this outfit?')) return;
    this.storage.deleteOutfit(id);
    this.loadData();
  }

  
}
