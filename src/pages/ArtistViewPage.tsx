import MainLayout from '@/layout/MainLayout';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArtistDetailed } from '../types/ArtistTypes';
import { getArtist } from '@/services/ArtistService';

const ArtistViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [artist, setArtist] = useState<ArtistDetailed | null>(null);

  useEffect(() => {
    if (!id) return;

    getArtist(id).then((data) => {
        setArtist(data);
        console.log("menna", data);
        console.log(artist)
    }).catch((error) => {
        console.log(error);
    });
    
}, [id]);

  return (
    <MainLayout>
        <div>
            <h1>Artist View Page</h1>
            <p>Artist ID: {id}</p>
        </ div>
    </MainLayout>
  );
};

export default ArtistViewPage;