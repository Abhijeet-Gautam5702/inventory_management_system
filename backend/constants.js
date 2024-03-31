// Database name
const DATABASE_NAME = "verbatim";

// API-Version
const API_VERSION = 1;

// Initial Error messages
const INITIAL_ERROR_MESSAGES = {
  USERS: {
    REGISTER_USER: "User could not be registered successfully",
    GET_LOGGED_IN_USER:
      "Logged-In User details could not be fetched successfully",
    LOGIN_USER: "User could not be logged in successfully",
    LOGOUT_USER: "User could not be logged out successfully",
    CHANGE_USER_PASSWORD: "User password could not be updated successfully",
    CHANGE_USER_DETAILS: "User details could not be updated successfully",
    GET_USER_REGISTERED_EVENTS:
      "Could not fetch user registered events successfully",
    GET_USER_HOSTED_EVENTS:
      "Could not fetch user hosted/created events successfully",
  },
  PRODUCT: {},
};

export { DATABASE_NAME, INITIAL_ERROR_MESSAGES, API_VERSION };
