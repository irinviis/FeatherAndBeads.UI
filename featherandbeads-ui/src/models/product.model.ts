import { IPhoto } from "./photo.model";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  priceWithoutTax: number;
  tax: number;
  quantity: number;
  removed: boolean;
  categoryId: number;
  mainPhoto: IPhoto;
  photos: IPhoto[];
}
