import EventCard from "./EventCard";

interface Artist {
  id: number;
  name: string;
  profile_image?: string;
  profile_image_url?: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  banner?: string;
  banner_url?: string;
  artist: Artist;
}

interface EventsSectionProps {
  title: string;
  events: Event[];
  emptyMessage: string;
  horizontal?: boolean;
}

export default function EventsSection({
  title,
  events,
  emptyMessage,
  horizontal = false,
}: EventsSectionProps) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      {events.length === 0 ? (
        <p className="text-gray-500">{emptyMessage}</p>
      ) : horizontal ? (
        // Mode horizontal scrollable
        <div
          className="flex gap-4 overflow-x-auto py-2 pl-4 pr-4 scrollbar-thin scrollbar-thumb-pink-600 scrollbar-track-gray-200"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="flex-shrink-0 scroll-snap-align-start"
              style={{ flexBasis: "80vw", maxWidth: 320, scrollSnapAlign: "start" }}
            >
              <EventCard {...event} />
            </div>
          ))}
        </div>
      ) : (
        // Mode grille classique
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} {...event} artist={{ ...event.artist, profile_image_url: event.artist.profile_image_url,}} />
          ))}
        </div>
      )}
    </section>
  );
}
