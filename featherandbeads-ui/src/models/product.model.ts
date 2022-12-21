import { IPhoto } from "./photo.model";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  priceWithTax: number;
  tax: number;
  quantity: number;
  removed: boolean;
  mainPhoto: IPhoto;
  photos: IPhoto[];
  productCategories: number[];
  photoFilesForUpload: File[];
  isLoading: boolean;
}
