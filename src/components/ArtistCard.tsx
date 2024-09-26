import { Link } from "react-router-dom";

interface ArtistCardProps {
  artist_image?: string;
  name?: string;
  id?: string;
}

const S3_BUCKET_URL = import.meta.env.VITE_S3_BUCKET_URL;

function ArtistCard({ artist_image: image, name, id }: ArtistCardProps) {
  return (
    <Link to={`/artists/${id}`}>
    <div className="flex flex-col items-center p-2 m-2 max-w-max">
      <div className="overflow-hidden w-32 h-32 rounded-full">
      <img
        src={image ? `${S3_BUCKET_URL}${image}` : "https://via.placeholder.com/150"}
        alt={(name || "Artist Name" ) + " Image"}
        className="w-32 h-32 rounded-full hover:scale-110 transition-transform "
      />
      </div>
      
      <h3 className="text-base text-center font-semibold mt-2 break-words w-full">{name || "Artist Name"}</h3>
    </div>
    </Link>

  );
}

export type { ArtistCardProps };
export { ArtistCard };