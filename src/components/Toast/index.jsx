import toast, { Toaster } from "react-hot-toast";

const toastSuccess = (message) => {
  toast.success(message, {
    id: message,
    style: {
      border: "1px solid green",
      padding: "12px",
    },
  });
};

const toastFail = (message) => {
  toast.error(message, {
    id: message,
    style: {
      border: "1px solid red",
      padding: "12px",
    },
  });
};

const toastInfo = (message) => {
  toast(message, {
    id: message,
    style: {
      color: "#fff",
      border: "1px solid blue",
      padding: "8px",
      backgroundColor: "#1034A6",
    },
  });
};
const toastPromise = (
  promiseAction,
  id,
  loadingMessage,
  successMessage,
  errorMessage
) => {
  toast.promise(
    promiseAction,
    {
      loading: loadingMessage ?? "Saving...",
      success: successMessage ?? "Success!",
      error: errorMessage ?? "Error!",
    },
    {
      id: id,
    }
  );
};

export { Toaster, toastFail, toastInfo, toastPromise, toastSuccess };
