import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import AlbumCard from "./AlbumCard"
import { Album } from '@/types/AlbumTypes';


interface AlbumCarouselProps {
  albums: Album[];
}

const AlbumCarousel: React.FC<AlbumCarouselProps> = ({ albums }) => {
  return (
    <Carousel opts={{ align: "center" }} className="mx-3">
      <CarouselContent className="max-w-fit">
        {albums.map((album) => (
          <CarouselItem key={"album-carousel-item-" +album.artist_id} className="max-w-fit p-4">
            <AlbumCard album={album} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default AlbumCarousel;
