import { useMutation } from "@tanstack/react-query";
import { ApiService } from "../service-axios";
import { api } from "../service-api";
import { toastFail, toastSuccess } from "../../components/Toast";

const postCreateUser = (userData) => {
  return ApiService.post(api.createuser, userData);
};

const usePostCreateUser = () => {
  return useMutation({
    mutationFn: postCreateUser,
    onSuccess: (success) => {
      if (success?.data?.success) {
        toastSuccess("User created successfully");
      } else {
        toastFail("Error occurred");
      }
    },
    onError: (error) => {
      toastFail("Error creating user:", error.message);
    },
  });
};

const loginUser = (userData) => {
  console.log("userData", userData);
  return ApiService.post(api.login, userData);
};

const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (success) => {
      // debugger
      if (success?.data?.success) {
        toastSuccess("User Logged in successfully");
      } else {
        toastFail("Error occurred");
      }
    },
    onError: (error) => {
      toastFail("Error logging user:", error.message);
    },
  });
};

export { usePostCreateUser, useLoginUser };
