import { Injectable } from '@angular/core';
import { ClothingItem } from '../models/clothing-item.model';
import { Outfit } from '../models/outfit.model';
import { v4 as uuidv4 } from 'uuid';

const ITEMS_KEY = 'om_items_v1';
const OUTFITS_KEY = 'om_outfits_v1';

/* ------------------------------
   DEFAULT ITEMS
-------------------------------- */
const DEFAULT_ITEMS: ClothingItem[] = [
  {
    id: 'default-top-1',
    name: 'White T-Shirt',
    filename: 'assets/defaults/white-shirt.png',
    category: 'Top',
    colorTag: 'White',
    createdAt: new Date().toISOString(),
    isDefault: true,
    season: 'All seasons'
  },
  {
    id: 'default-bottom-1',
    name: 'Blue Jeans',
    filename: 'assets/defaults/blue-jeans.png',
    category: 'Bottom',
    colorTag: 'Blue',
    createdAt: new Date().toISOString(),
    isDefault: true,
    season: 'All seasons'
  },
  {
    id: 'default-shoes-1',
    name: 'Black Sneakers',
    filename: 'assets/defaults/black-sneakers.png',
    category: 'Shoes',
    colorTag: 'Black',
    createdAt: new Date().toISOString(),
    isDefault: true,
    season: 'All seasons'
  },
  {
    id: 'default-top-2',
    name: 'Blue Jacket',
    filename: 'assets/defaults/blue-jacket.jpg',
    category: 'Top',
    colorTag: 'Blue',
    createdAt: new Date().toISOString(),
    isDefault: true,
    season: 'Winter'
  },
  {
    id: 'default-shoes-2',
    name: 'Brown Shoes',
    filename: 'assets/defaults/brown-shoes.jpg',
    category: 'Shoes',
    colorTag: 'Brown',
    createdAt: new Date().toISOString(),
    isDefault: true,
    season: 'All seasons'
  },
  {
    id: 'default-accessory-1',
    name: 'Glasses',
    filename: 'assets/defaults/glasses.jpg',
    category: 'Accessory',
    colorTag: 'Black',
    createdAt: new Date().toISOString(),
    isDefault: true,
    season: 'All seasons'
  },
  {
    id: 'default-accessory-2',
    name: 'Green Hat',
    filename: 'assets/defaults/green-hat.jpg',
    category: 'Accessory',
    colorTag: 'Green',
    createdAt: new Date().toISOString(),
    isDefault: true,
    season: 'Summer'
  },
  {
    id: 'default-accessory-3',
    name: 'Brown Bag',
    filename: 'assets/defaults/brown-bag.jpg',
    category: 'Accessory',
    colorTag: 'Brown',
    createdAt: new Date().toISOString(),
    isDefault: true,
    season: 'All seasons'
  },
  {
    id: 'default-top-3',
    name: 'White Sweater',
    filename: 'assets/defaults/white-sweater.jpg',
    category: 'Top',
    colorTag: 'White',
    createdAt: new Date().toISOString(),
    isDefault: true,
    season: 'Winter'
  },
  {
    id: 'default-top-4',
    name: 'Pink Jacket',
    filename: 'assets/defaults/pink-jacket.jpg',
    category: 'Top',
    colorTag: 'Pink',
    createdAt: new Date().toISOString(),
    isDefault: true,
    season: 'Winter'
  }
];

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
    this.initializeDefaultItems();
  }

  /* ------------------------------
     DEFAULT ITEMS INIT
  -------------------------------- */
  private initializeDefaultItems() {
    const existing = this.loadItems();
    const hasDefaults = existing.some(item => item.isDefault);

    if (!hasDefaults) {
      this.saveItems([...DEFAULT_ITEMS, ...existing]);
    }
  }

  /* ------------------------------
     CLOTHING ITEMS
  -------------------------------- */
  loadItems(): ClothingItem[] {
    const raw = localStorage.getItem(ITEMS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  saveItems(items: ClothingItem[]) {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  }

  addItem(item: Partial<ClothingItem>) {
    const items = this.loadItems();

    const newItem: ClothingItem = {
      id: uuidv4(),
      name: item.name || '',
      filename: item.filename || '',
      category: item.category || 'other',
      colorTag: item.colorTag || '',
      createdAt: new Date().toISOString(),
      isDefault: item.isDefault || false,
      season: ''
    };

    items.push(newItem);
    this.saveItems(items);
    return newItem;
  }

  updateItem(updated: ClothingItem) {
    const items = this.loadItems().map(i =>
      i.id === updated.id ? updated : i
    );
    this.saveItems(items);
  }

  deleteItem(id: string) {
    const items = this.loadItems().filter(i => i.id !== id);
    this.saveItems(items);
  }

  /* ------------------------------
     OUTFITS
  -------------------------------- */
  loadOutfits(): Outfit[] {
    const raw = localStorage.getItem(OUTFITS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  saveOutfits(outfits: Outfit[]) {
    localStorage.setItem(OUTFITS_KEY, JSON.stringify(outfits));
  }

  addOutfit(itemIds: string[], name?: string) {
    const outfits = this.loadOutfits();

    const newOutfit: Outfit = {
      id: uuidv4(),
      name: name || 'My outfit',
      itemIds,
      createdAt: new Date().toISOString()
    };

    outfits.push(newOutfit);
    this.saveOutfits(outfits);
    return newOutfit;
  }

  updateOutfit(updated: Outfit) {
    const outfits = this.loadOutfits().map(o =>
      o.id === updated.id ? updated : o
    );
    this.saveOutfits(outfits);
  }

  deleteOutfit(id: string) {
    const outfits = this.loadOutfits().filter(o => o.id !== id);
    this.saveOutfits(outfits);
  }
}
