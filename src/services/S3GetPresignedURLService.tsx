import axios, { AxiosResponse } from 'axios';

const API_BASE_URL= "https://q85cqy4ld4.execute-api.us-east-1.amazonaws.com/dev/v1"

const fetchPresignedURL = async (fileType: "image/png" | "image/jpeg"| "audio/mpeg" ,uploadCategory: "artist_image" | "album_art" | "track_audio"): Promise<AxiosResponse<any, any>> => {
    const response = await axios.get(`${API_BASE_URL}/getpresignedurl?fileType=${fileType}&uploadCategory=${uploadCategory}`);
    return response;
}

// {
//     "uploadURL": "https://dreamstreamer-uploads.s3.us-east-1.amazonaws.com/artists/422220560.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAQ3EGSDKRIBLQUKKR%2F20240915%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240915T165530Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIAKKF2TKfksaIfyw0z757MyYLBtDALcA%2FOdp12xNnlVgAiBbPF4y2sp5Odz8%2FNds7sTIIuvq9%2BHoS%2B0AK6GgBebdSSr7Agjy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDA1ODI2NDI2MzMzMCIMBtg1MGzhsKK%2Bjd1CKs8CoJFk%2Boq2exwMkgJbtLtITAELXC4NroSfDIRqchhwnOwQE%2BBit61MKFFsBenmNSt52hmOTzzEiOi6oo1Ri%2FGuru93LbrxPUq0VsZ3I4CYLE6EnEHjAO8D1V9v98NOqJvYrYLQMfV31cyUpVsxSSaSZ4DmDmFoAysDF3D5iVd8iDeV0G1K9x8hLsapqXfegDVjy9oqrpKr1C%2FNn%2FjkX1XgofkgtwTROBep2M96253IPMG6mfvyumyjlp%2FdGIxg2OVX2a7azvCA%2FeGJO2e6YQIminXq6zWFOXxjlE264EY%2FSEDV3%2FLj%2Bmn24rFdvAXGxl2URFCoWQ8o110lfC3f%2BnWWN5rIQNfUvQJtFCPJwkJ46B%2BQ2UskBvHZAXKRaUkDn1d8NWz%2B%2BHQbyY71krYUtRYyhGLRYBHbgdFeoxIBZDw%2B7epr6%2FoALRb1jeNn%2BhL9Afow1KKctwY6nwEaBSEbeEa5c31jeHEKZjgEAQwwn6YyqPn9LfM1D4ebaKsukeUUwn1m%2FYj2SHIx5ycSBQnQRn3K3EcxSE698mGZIvkYgk7lz%2BAzNk6P0CZTTeFsJsmzeNfEPpU79seWLj8SY7z0M4wEPe4qc0jog3lWGULB9jjFfsFJOQuFVJkzvbLbhNK4uYqeGCxqxQDi8HE386pqT6JxX%2FOjwc6wt3M%3D&X-Amz-Signature=93fff1c19f2001189a74a4039b32d436f193dfcc947e197251bd0aae955aa1bc&X-Amz-SignedHeaders=host&x-id=PutObject",
//     "filename": "artists/422220560.png"
// }

export const fetchImageUploadPresignedURL = async (fileType: "image/png" | "image/jpeg", uploadCategory: "artist_image" | "album_art"): Promise<AxiosResponse<any, any>> => {
    return fetchPresignedURL(fileType, uploadCategory);
}

export const fetchAudioUploadPresignedURL = async (): Promise<AxiosResponse<any, any>> => {
    return fetchPresignedURL("audio/mpeg", "track_audio");
}