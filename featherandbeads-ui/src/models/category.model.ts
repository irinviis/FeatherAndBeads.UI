import { IPhoto } from "./photo.model";

export interface ICategory {
  id: number;
  categoryName: string;
  link: string;
  photo: IPhoto;
  photoFileForUpload: File;
  isLoading: boolean;
}
