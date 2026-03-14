export const initialState = {
  favourites: JSON.parse(localStorage.getItem("favourites")) || []
};

export function favouritesReducer(state, action) {

  switch (action.type) {

    case "TOGGLE_FAV":

      const exists = state.favourites.includes(action.payload);

      const updatedFavourites = exists
        ? state.favourites.filter((id) => id !== action.payload)
        : [...state.favourites, action.payload];

      localStorage.setItem(
        "favourites",
        JSON.stringify(updatedFavourites)
      );

      return { favourites: updatedFavourites };

    default:
      return state;
  }

}