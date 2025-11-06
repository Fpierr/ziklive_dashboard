interface Artist {
  id: number;
  nom: string;
  genre: string;
}

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <div className='border rounded p-4 shadow-sm bg-background text-foreground'>
      <h3 className='text-lg font-semibold'>{artist.nom}</h3>
      <p className='text-sm text-gray-500'>Genre: {artist.genre}</p>
    </div>
  );
}
