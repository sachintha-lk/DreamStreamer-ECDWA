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

      className=" w-10/12 my-4"
    >
      <CarouselContent className="max-w-fit">
        {artists.map((artist) => (
          <CarouselItem key={artist.id} className="max-w-fit">
              <ArtistCard id={artist.id} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default ArtistCarousel;

