import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import TrackCard from './TrackCard';
import { Track } from '../pages/Manage/ManageTracks/TrackTypes';

interface TrackCarouselProps {
  tracks: Track[];
}

const TrackCarousel: React.FC<TrackCarouselProps> = ({ tracks }) => {
  return (
    <Carousel opts={{ align: "center" }} className="mx-3">
      <CarouselContent className="max-w-fit">
        {tracks.map((track) => (
          <CarouselItem key={"track-carousel-item-" + track.id} className="max-w-fit">
            <TrackCard track={track} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default TrackCarousel;
