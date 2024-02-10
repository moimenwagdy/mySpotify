export interface playlistItem {
  description: string;
  href: string;
  id: string;
  images: { url: string }[];
  name: string;
  owner: { display_name: string };
  tracks: { href: string; total: number };
}

export default interface playlistType {
  playlists: {
    items: playlistItem[];
    limit: number;
    offset: number;
    next: string;
    previous: string;
    total: string;
  };
}
