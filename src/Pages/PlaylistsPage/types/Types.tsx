import { AlbumItem, artisItem } from "../../AlbumsPage/Types/Types";

export interface playlistItem {
  items: playlistContent[];
  limit: number;
  offset: number;
  next: string;
  previous: string;
  total: number;
}

export interface playlistContent {
  description: string;
  href: string;
  id: string;
  images: { url: string }[];
  name: string;
  owner: { display_name: string };
  tracks: tracks;
  uri: string;
}



export default interface playlistData {
  data: {
    playlist: playlistItem;
    message: string;
  };
}
export interface track {
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

export interface tracksItems {
  added_at: string;
  track: track;
}

export interface tracks {
  href: string;
  items: tracksItems[];
  limit: number;
  offset: number;
  next: string;
  previous: string;
  total: number;
}

export interface playlistDetails {
  playlistDetails: {
    description: string;
    followwers: { total: number };
    href: string;
    id: string;
    images: { hieght: number; width: number; url: string };
    name: string;
    owner: { display_name: string };
    tracks: tracks;
  };
}
