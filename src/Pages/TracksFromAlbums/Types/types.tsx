import { AlbumItem, artisItem } from "../../AlbumsPage/Types/Types";

export interface AlbuumTrack {
  album: AlbumItem;
  artists: artisItem[];
  duration_ms: number;
  href: string;
  id: string;
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface AlbumTracksItems {
  added_at: string;
  track: AlbuumTrack;
}

export interface albumTracks {
  href: string;
  items: AlbuumTrack[];
  limit: number;
  offset: number;
  next: string;
  previous: string;
  total: number;
}
