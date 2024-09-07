// import { useEffect, useState } from 'react'
// import axios from 'axios'
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
// import { Skeleton } from '@/components/ui/skeleton';
// import { Button } from '@/components/ui/button';

// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"

// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
//   } from "@/components/ui/dialog"
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
  

// type Genre = {
//     id: string;
//     name: string;
// };

// type AddGenreMessage = {
//     type: "success" | "error";
//     message: string;
// };

// function ManageGenres() {
//     const [genres, setGenres] = useState<Genre[]>([]);
//     const [loading, setLoading] = useState(true);  
//     const [addGenreName, setAddGenreName] = useState<string | null>(null);
//     const [addGenreNameErrorMsg, setAddGenreNameMsg] = useState<AddGenreMessage | null >(null)
//     const [addGenreModelOpen, setAddGenreModelOpen] = useState(false);

//     const fetchGenres = async () => {
//         try {
//             const response = await fetch(`https://q85cqy4ld4.execute-api.us-east-1.amazonaws.com/dev/v1/genres`);
//             const data = await response.json();
//             console.log("data", data);
//             if (response.ok) {

//                 const genres = data.map((genre: any) => ({
//                     id: genre.id.toString(),
//                     name: genre.name,
//                 }));

//                 console.log("Genres:", genres);
//                 setGenres(genres);
//                 setLoading(false);
//             } else {
//                 console.error("Failed to fetch genres:", data);
//             }
//         } catch (error) {
//             console.error("Error fetching genres:", error);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchGenres();
//     }, []);

//     const deleteGenre = async (id: string) => {
//         try {
//             console.log("Deleting genre with id:", id);
//             const response = await fetch(`https://q85cqy4ld4.execute-api.us-east-1.amazonaws.com/dev/v1/genres/${id}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },

//             });
                        
//             if (response.status === 200) {
//                 console.log("Genre deleted successfully");
//                 const updatedGenres = genres.filter((genre) => genre.id !== id);
//                 setGenres(updatedGenres);
//             } else {
//                 console.error("Failed to delete genre");
//             }
//         } catch (error) {
//             console.error("Error deleting genre:", error);
//         }
//     };

//     const deleteConfirmationDialog = (id: string, name: string) => (
//         <AlertDialog>
//             <AlertDialogTrigger asChild>
//                 <Button variant="destructive">Delete</Button>
//             </AlertDialogTrigger>
//             <AlertDialogContent>
//                 <AlertDialogHeader>
//                     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                     <AlertDialogDescription>
//                         This action cannot be undone. This will permanently delete the genre {name}.
//                     </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                     <AlertDialogCancel>Cancel</AlertDialogCancel>
//                     <AlertDialogAction onClick={() => deleteGenre(id)}>Confirm</AlertDialogAction>
//                     {/* <Button variant={"destructive"} onClick={() => deleteGenre(id)}>Confirm</Button> */}
//                 </AlertDialogFooter>
//             </AlertDialogContent>
//         </AlertDialog>
//     );

//     const onAddGenreClick = async () => {

//         if (addGenreName === null || addGenreName === "" ) {
//             setAddGenreNameMsg({
//                 type: "error",
//                 message: "Genre name is required"
//             })
//             return;
//         }

//         axios.post('https://q85cqy4ld4.execute-api.us-east-1.amazonaws.com/dev/v1/genres', {
//             genre_name: addGenreName
//         }).then((response) => {
//             console.log("Response:", response);
//             if (response.status === 201) {
//                 console.log("Genre added successfully");
//                 setAddGenreNameMsg({
//                     type: "success",
//                     message: "Genre added successfully"
//                 })
//                 setAddGenreName(null);
//                 fetchGenres();
//                 setTimeout(() => {
//                     setAddGenreModelOpen(false);
//                 }, 500);
//             } 
//         }).catch((error) => {
//             console.error("Error adding genre:", error);

//             if (error.response.status === 409) {
//                 setAddGenreNameMsg({
//                     type: "error",
//                     message: error.response.data.message
//                 })
//             } else if (error.response.status === 400) {
//                 setAddGenreNameMsg({
//                     type: "error",
//                     message: error.response.data.message   
//                 })
//             } else {
//                 setAddGenreNameMsg({
//                     type: "error",
//                     message: "An error occurred while adding the genre"
//                 })
//             }
//         });

//     }

//     const addGenreDialog = () => (
//                 <Dialog open={addGenreModelOpen} onOpenChange={ 
//                         () => {
//                             setAddGenreName(null)
//                             setAddGenreNameMsg(null)
//                             setAddGenreModelOpen(!addGenreModelOpen)
//                         }
//                     }>
//                     <DialogTrigger asChild>
//                         <Button variant="default">Add Genre</Button>
//                     </DialogTrigger>
//                     <DialogContent className="sm:max-w-[300px]">
//                         <DialogHeader>
//                         <DialogTitle>Add New Genre</DialogTitle>
//                         <DialogDescription>
//                             Add a new genre to the list of genres.
//                         </DialogDescription>
//                         </DialogHeader>
//                         <div className="grid gap-4 py-4">
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="name" className="text-right">
//                             Name
//                             </Label>
//                             <Input
//                             id="name"
//                             {...(addGenreNameErrorMsg && { className: "border-red-500" })}
//                             className='col-span-3'
//                             onChange={(event) => setAddGenreName(event.target.value) }
//                             />
//                             {addGenreNameErrorMsg && 
//                             (addGenreNameErrorMsg.type === "error" ? (
//                                 <p className="col-span-4 text-red-500 text-sm">{addGenreNameErrorMsg.message}</p>
//                             ) : (
//                                 <p className="col-span-4 text-green-500 text-sm">{addGenreNameErrorMsg.message}</p>
                            
//                             ))}
//                         </div>
                       
//                         </div>
//                         <DialogFooter>
//                             <Button type="submit" onClick={ () => onAddGenreClick() }>Add</Button>
//                         </DialogFooter>
//                     </DialogContent>
//                     </Dialog>
//     );

//     return (
//         <div>
//             <div className='mx-3'>
//                 <h1 className='text-2xl font-semibold'>Manage Genres</h1>
                
//                 {addGenreDialog()}
                
//             </div>
//             {loading ? (
//                 <div className="space-y-4">
//                     <Skeleton className="h-8 w-full" />
//                     <Skeleton className="h-8 w-full" />
//                     <Skeleton className="h-8 w-full" />
//                     <Skeleton className="h-8 w-full" />
//                 </div>
//             ) : (
//                 <Table className=''>
//                     <TableCaption>Genres</TableCaption>
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead>Genre ID</TableHead>
//                             <TableHead>Name</TableHead>
//                             <TableHead>Actions</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {genres.map((genre) => (
//                             <TableRow key={genre.id}>
//                                 <TableCell>{genre.id}</TableCell>
//                                 <TableCell>{genre.name}</TableCell>
//                                 <TableCell>
//                                     <Button>Edit</Button>
//                                     {deleteConfirmationDialog(genre.id, genre.name)}
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             )}
//         </div>
//     )
// }

// export default ManageGenres;
