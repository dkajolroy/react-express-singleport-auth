import { Id, toast } from "react-toastify";

export const toastSuccess = (id: Id, text: String) => {
  return toast.update(id, {
    render: text,
    type: "success",
    isLoading: false,
    autoClose: 4000,
  });
};

export const toastError = (id: Id, text: String) => {
  return toast.update(id, {
    render: text,
    type: "error",
    isLoading: false,
    autoClose: 4000,
  });
};
