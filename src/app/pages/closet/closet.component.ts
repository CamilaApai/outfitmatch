
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { UploadModalComponent } from '../../components/upload-modal/upload-modal.component';
import { ClothingItem } from '../../models/clothing-item.model';

@Component({
  selector: 'app-closet',
  standalone: true,
  imports: [CommonModule, FormsModule, UploadModalComponent],
  templateUrl: './closet.component.html',
  styleUrls: ['./closet.component.css']
})
export class ClosetComponent {

  showUploadModal = false;

  filterCategory = '';
  filterSeason = '';
  filterColor = '';

  readonly COLORS = [
    'black',
    'white',
    'gray',
    'brown',
    'beige',
    'red',
    'blue',
    'green',
    'pink',
    'yellow',
    'purple'
  ];

  constructor(private storage: StorageService) {}

  openUploadModal() {
    this.showUploadModal = true;
  }

  closeUploadModal(saved: boolean) {
    this.showUploadModal = false;
    this.editingItem = undefined;
  }

  get items(): ClothingItem[] {
    return this.storage.loadItems();
  }

  get filteredItems(): ClothingItem[] {
    return this.items.filter(item => {
      const category = item.category?.toLowerCase();
      const season = item.season?.toLowerCase();
      const color = item.colorTag?.toLowerCase();
  
      const matchesCategory =
        !this.filterCategory || category === this.filterCategory.toLowerCase();
  
      const matchesColor =
        !this.filterColor || color?.includes(this.filterColor.toLowerCase());
  
      const matchesSeason =
        !this.filterSeason ||
        season === this.filterSeason.toLowerCase() ||
        season === 'all seasons';
  
      return matchesCategory && matchesColor && matchesSeason;
    });
  }

  deleteItem(id: string) {
    this.storage.deleteItem(id);
  }

 
editingItem?: ClothingItem;
editItem(item: ClothingItem) {
  this.editingItem = item;
  this.showUploadModal = true;
}




}
