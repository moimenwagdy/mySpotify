export interface artistsAlbums {
  items: AlbumItem[];
  next: string;
  previous: string;
  total: number;
}

export interface AlbumItem {
  href: string;
  id: string;
  name: string;
  album_type: string;
  images: { url: string }[];
  total_tracks: number;
  release_date: string;
  artists: artisItem[];
}

export interface artisItem {
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
