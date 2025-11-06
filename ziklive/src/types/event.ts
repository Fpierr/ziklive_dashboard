export interface Artist {
  id: number;
  name: string;
  profile_image?: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  banner?: string;
  banner_url?: string;
  artist: Artist;
}

export interface UseEventsResult {
  upcomingEvents: Event[];
  pastEvents: Event[];
  loading: boolean;
  error: string | null;
}