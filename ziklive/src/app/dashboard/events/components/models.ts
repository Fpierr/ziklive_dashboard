//
// --- ARTIST ------------------------------
//

export interface Artist {
  id: string | number;
  name: string;
  //profile_image?: string;
}

//
// --- EVENT -------------------------------------
//

// Ce qu’on envoie dans le formulaire (POST/PUT)
export interface EventInput {
  title: string;
  description?: string;
  date: string;
  location?: string;
  artist_id: string | number;
}

// Ce qu’on reçoit depuis l’API (GET)
export interface EventOutput {
  id: string | number;
  title: string;
  description?: string | null;
  date: string;
  location?: string | null;
  artist: Artist;
  created_by?: string | number;
}

//
// --- TICKET TYPE --------------------------
//

export interface TicketType {
  id?: string;
  event: string;
  name: string;
  price: number;
  quantity: number;
  sale_starts: string;
  sale_ends: string;
  tickets_sold?: number;
  tickets_remaining?: number;
}
