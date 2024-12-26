import { useMutation } from "@tanstack/react-query";
import { ApiService } from "../service-axios";
import { api } from "../service-api";
import { toastFail, toastSuccess } from "../../components/Toast";

const checkout = (body) => {
  return ApiService.post(api.orderData, body);
};

const useCheckout = () => {
  return useMutation({
    mutationFn: checkout,
    onSuccess: (success) => {
      if (success?.status === 200) {
        toastSuccess("Checked out successfully");
      } else {
        toastFail("Error occurred");
      }
    },
    onError: (error) => {
      toastFail("Error checking out data:", error.message);
    },
  });
};

export { useCheckout };
