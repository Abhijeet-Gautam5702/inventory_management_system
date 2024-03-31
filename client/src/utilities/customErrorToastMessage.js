/*
    Custom Error Toast Message

    This method looks for the desired statusCode and returns appropriate error message

    NOTE: "messages" is an object containing errorCodes as keys and custom messages as values
*/
export default function customErrorToastMessage(messages, errorCode) {
  let toastMessage = "Some unknown error occured at our end";
  for (const k of Object.keys(messages)) {
    if (k == errorCode) {
      toastMessage = messages[k];
      break;
    }
  }
  return toastMessage;
}

