export interface Message {
  id: number;
  type: string;
  imgSrc?: string;
  message: string;
  expires: number;
}
