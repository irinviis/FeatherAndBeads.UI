import { IPhoto } from "./photo.model";

export interface IProduct {
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  priceWithTax: number;
  priceWithoutTax: number;
  tax: number;
  quantity: number;
  cartQuantity: number;
  removed: boolean;
  mainPhoto: IPhoto;
  photos: IPhoto[];
  productCategories: number[];
  photoFilesForUpload: File[];
  isLoading: boolean;
}
