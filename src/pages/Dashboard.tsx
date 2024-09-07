import ArtistCarousel from "@/components/ArtistCarousel"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import MainLayout from "@/layout/MainLayout"

function Dashboard() {

  const artists = [
    {
      id: "1",
      name: "Artist 1",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "2",
      name: "Artist 2",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "3",
      name: "Artist 3",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "4",
      name: "Artist 4",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "5",
      name: "Artist 5",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "6",
      name: "Artist 6",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "5",
      name: "Artist 5",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "6",
      name: "Artist 6",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "5",
      name: "Artist 5",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "6",
      name: "Artist 6",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "5",
      name: "Artist 5",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "6",
      name: "Artist 6",
      image: "https://via.placeholder.com/150"
    },
  ]

  return (
    <MainLayout>
        Dahsboard
        <div className="mx-4 my-2">
            <h1 className="text-2xl font-semibold mx-4 my-1">Artists</h1>
            <ArtistCarousel artists={artists} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle >Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

    </MainLayout>  
  )
}

export default Dashboard
