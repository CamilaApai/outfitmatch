import { Injectable } from '@angular/core';
import { ClothingItem } from '../models/clothing-item.model';
import { v4 as uuidv4 } from 'uuid';
import { Outfit } from '../models/outfit.model';

const ITEMS_KEY = 'om_items_v1';
const OUTFITS_KEY = 'om_outfits_v1';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  // CLOTHING ITEMS
  loadItems(): ClothingItem[] {
    const raw = localStorage.getItem(ITEMS_KEY);
    return raw ? JSON.parse(raw) : [];
  }
  // Save the entire list of items
  saveItems(items: ClothingItem[]) {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  }
  // Add a new clothing item
  addItem(item: Partial<ClothingItem>) {
    const items = this.loadItems();

    const newItem: ClothingItem = {
      id: uuidv4(),
      name: item.name || '',
      filename: item.filename || '',
      category: item.category || 'other',
      colorTag: item.colorTag || '',
      createdAt: new Date().toISOString(),
      season: item.season || 'all',
    };
    // Add the new item to the list and save
    items.push(newItem);
    this.saveItems(items);
    return newItem;
  }
  // Update an existing clothing item
  updateItem(updated: ClothingItem) {
    const items = this.loadItems().map((i) =>
      i.id === updated.id ? updated : i
    );
    this.saveItems(items);
  }
  // Delete a clothing item by ID
  deleteItem(id: string) {
    const items = this.loadItems().filter((i) => i.id !== id);
    this.saveItems(items);
  }

  // OUTFITS
  loadOutfits(): Outfit[] {
    const raw = localStorage.getItem(OUTFITS_KEY);
    return raw ? JSON.parse(raw) : [];
  }
  
  //  Save the entire list of outfits
  saveOutfits(outfits: Outfit[]) {
    localStorage.setItem(OUTFITS_KEY, JSON.stringify(outfits));
  }
  
  // Add a new outfit
  addOutfit(itemIds: string[], name?: string) {
    const outfits = this.loadOutfits();
  
    const newOutfit: Outfit = {
      id: uuidv4(),
      name: name || 'My outfit',
      itemIds,
      createdAt: new Date().toISOString(),
    };
  
    outfits.push(newOutfit);
    this.saveOutfits(outfits);
    return newOutfit;
  }
  
  // Update an existing outfit
  updateOutfit(updated: Outfit) {
    const outfits = this.loadOutfits().map((o) =>
      o.id === updated.id ? updated : o
    );
    this.saveOutfits(outfits);
  }
  
  // Delete an outfit by ID
  deleteOutfit(id: string) {
    const outfits = this.loadOutfits().filter((o) => o.id !== id);
    this.saveOutfits(outfits);
  }
}
