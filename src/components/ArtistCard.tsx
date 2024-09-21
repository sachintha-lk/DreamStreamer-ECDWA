import { Link } from "react-router-dom";
import { Card } from "./ui/card";

interface ArtistCardProps {
  image?: string;
  name?: string;
  id?: string;
}

function ArtistCard({ image, name, id }: ArtistCardProps) {
  return (
    <Link to={`/artists/${id}`}>
    <Card className="flex flex-col items-center p-2 m-2 max-w-max">
      <div className="overflow-hidden w-32 h-32 rounded-full">
      <img
        src={image || "https://via.placeholder.com/150"}
        alt={(name || "Artist Name" ) + " Image"}
        className="w-32 h-32 rounded-full hover:scale-110 transition-transform "
      />
      </div>
      
      <h3 className="text-base text-center font-semibold mt-2">{name || "Artist Name"}</h3>
    </Card>
    </Link>

  );
}

export type { ArtistCardProps };
export { ArtistCard };