export interface LiveStream {
  id: string;
  title: string;
  description: string;
  artist: string;
  artist_name: string;
  status: "idle" | "live" | "ended";
  viewer_count: number;
  peak_viewers: number;
  playback_url: string;
  created_at: string;
  started_at: string | null;
  is_paid: boolean;
  ticket_price: string;
  is_owner: boolean;
  stream_key?: string;
  ingest_endpoint?: string;
}

export interface StreamSession {
  session_id: string;
  playback_url: string;
}