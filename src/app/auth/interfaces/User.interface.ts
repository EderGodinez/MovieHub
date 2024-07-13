export interface User {
  id:string
  name: string|null|undefined;
  email: string|null|undefined;
  password: string|null|undefined;
  FavoritesMediaId: number[];
}
