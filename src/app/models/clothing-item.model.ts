export interface ClothingItem {
  id: string;
  name?: string;
  filename: string;
  category: string;
  colorTag?: string;
  season?: string;
  createdAt: string;
  isDefault?: boolean;
}
