export interface playlistItem {
  items: playlistContent[];
  limit: number;
  offset: number;
  next: string;
  previous: string;
  total: string;
}

export interface playlistContent {
  description: string;
  href: string;
  id: string;
  images: { url: string }[];
  name: string;
  owner: { display_name: string };
  tracks: { href: string; total: number };
}

export default interface playlistData {
  data: {
    playlist: playlistItem;
    message: string;
  };
}

// export interface tracks extends playlistType {
//   href: string;
// }

export interface playlistDetails {
  playlistDetails: {
    description: string;
    followwers: { total: number };
    href: string;
    id: string;
    images: { hieght: number; width: number; url: string };
    name: string;
    owner: { display_name: string };
    // tracks: tracks[];
  };
}
