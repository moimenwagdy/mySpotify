import { errorContent } from "../../../utllties/interfaces";
import { playlistItem } from "../../PlaylistsPage/types/Types";

export interface searchAlbums {
  items: SearchAlbumItem[];
  next: string;
  previous: string;
  total: number;
}

export interface SearchAlbumItem {
  href: string;
  id: string;
  name: string;
  album_type: string;
  images: { url: string }[];
  total_tracks: number;
  release_date: string;
  artists: artisItem[];
  type: string;
}

export interface artisItem {
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface SearchPlaylistItem {
  items: SearchPlaylistContent[];
  limit: number;
  offset: number;
  next: string;
  previous: string;
  total: number;
}

export interface SearchPlaylistContent {
  description: string;
  href: string;
  id: string;
  images: { url: string }[];
  name: string;
  owner: { display_name: string };
  uri: string;
}

export interface SearchArtistitem {
  followers: { total: string };
  id: string;
  images: { url: string }[];
  name: string;
  type: string;
  uri: string;
}

export interface SearchArtistItems {
  items: SearchArtistitem[];
  limit: number;
  offset: number;
  next: string;
  previous: string;
  total: number;
}

export interface track {
  album: SearchAlbumFromTractResult;
  artists: artisItem[];
  duration_ms: number;
  href: string;
  id: string;
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface SearchTracks {
  href: string;
  items: track[];
  limit: number;
  offset: number;
  next: string;
  previous: string;
  total: number;
}

export interface SearchAlbumFromTractResult {
  href: string;
  id: string;
  name: string;
  album_type: string;
  images: { url: string }[];
  total_tracks: number;
  release_date: string;
  artists: artisItem[];
}

export interface fullSearchResult {
  albums: searchAlbums;
  playlists: playlistItem;
  artists: SearchArtistItems;
  tracks: SearchTracks;
  error: errorContent;
}
