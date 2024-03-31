import { create } from "zustand";

// Slice for the active Index of the Panel Section
const createActiveIndexSlice = (set) => {
  return {
    activeIndex: 0,
    changeActiveIndex: (newIndex) =>
      set(() => {
        return {
          activeIndex: newIndex,
        };
      }),
  };
};

// Slice for the User details to be displayed on the top-right user-profile icon
const createUserProfileSlice = (set) => {
  return {
    fullname: "John Doe",
    profilePictureURL: "https://localhost:3000",
    changeDetails: (newFullname, newURL) =>
      set(() => {
        return {
          fullname: newFullname,
          profilePictureURL: newURL,
        };
      }),
  };
};

// Creating a Zustand store with all slices
const useStore = create((...a) => ({
  ...createActiveIndexSlice(...a),
  ...createUserProfileSlice(...a),
}));

export default useStore;
