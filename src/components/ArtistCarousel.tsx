import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {ArtistCard, ArtistCardProps } from "./ArtistCard"


function ArtistCarousel({ artists }: { artists: ArtistCardProps[] } ) {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="mx-3"
    >
      <CarouselContent className="max-w-fit">
        {artists.map((artist) => (
          <CarouselItem key={"artist-carousel-item-"+artist.id} className="max-w-fit">
              <ArtistCard id={artist.id} name={artist.name} artist_image={artist.artist_image} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default ArtistCarousel;

