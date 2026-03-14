import { useReducer, useState, useCallback, useMemo } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import { favouritesReducer, initialState } from "../reducer/favouritesReducer";
import PhotoCard from "./PhotoCard";

export default function Gallery() {

  const { photos, loading, error } = useFetchPhotos();

  const [state, dispatch] = useReducer(
    favouritesReducer,
    initialState
  );

  const [search, setSearch] = useState("");

  // useCallback for search handler
  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  // useMemo for filtered photos
  const filteredPhotos = useMemo(() => {

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(
        search.toLowerCase()
      )
    );

  }, [photos, search]);

  if (loading)
  return (
    <div className="flex justify-center items-center h-40">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
    </div>
  );

  if (error)
    return (
      <p className="text-center text-red-500">
        {error}
      </p>
    );

  return (
    <div>

      <input
  type="text"
  placeholder="Search by author..."
  onChange={handleSearch}
  className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {filteredPhotos.map((photo) => (

          <PhotoCard
            key={photo.id}
            photo={photo}
            favourites={state.favourites}
            dispatch={dispatch}
          />

        ))}

      </div>

    </div>
  );

}