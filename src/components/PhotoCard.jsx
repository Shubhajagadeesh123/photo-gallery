export default function PhotoCard({
  photo,
  favourites,
  dispatch
}) {

  const isFavourite = favourites.includes(photo.id);

  return (

    <div className="border rounded-lg shadow-sm p-2 hover:shadow-lg transition duration-300">

      <img
        src={photo.download_url}
        alt={photo.author}
        className="w-full h-40 object-cover rounded-md"
      />

      <div className="flex justify-between items-center mt-2">

        <p className="text-sm font-medium">
          {photo.author}
        </p>

        <button
          onClick={() =>
            dispatch({
              type: "TOGGLE_FAV",
              payload: photo.id
            })
          }
          className="text-xl"
        >
          {isFavourite ? "❤️" : "🤍"}
        </button>

      </div>

    </div>

  );

}