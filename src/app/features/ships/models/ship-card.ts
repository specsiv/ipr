export interface ShipCardPreviewData {
  name: string | null;
  image: string | null;
  year: number | null;
}

export interface ShipCardData {
  id: string | null;
  name: string | null;
  image: string | null;
  year: number | null;
  roles: Array<string | null> | null;
  type: string | null;
}
