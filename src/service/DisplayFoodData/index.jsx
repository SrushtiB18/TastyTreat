import { useMutation } from "@tanstack/react-query";
import { ApiService } from "../service-axios";
import { api } from "../service-api";
import { toastFail, toastSuccess } from "../../components/Toast";

const fetchFoodData = () => {
  return ApiService.post(api.foodData);
};

const useFetchFoodData = () => {
  return useMutation({
    mutationFn: fetchFoodData,
    // onSuccess: (success) => {
    //   if (success?.status !== 200) {
    //     toastFail("An Error occurred");
    //   }
    // },
    onError: (error) => {
      const errorMessage =
        error.message || "An error occurred while fetching data.";
      toastFail(errorMessage);
      console.error("Error fetching food data:", errorMessage);
    },
  });
};

const fetchMyOrderData = (body) => {
  return ApiService.post(api.myOrderData, body);
};

const useFetchMyOrderData = () => {
  return useMutation({
    mutationFn: fetchMyOrderData,
    onSuccess: (success) => {
      if (success?.status === 200) {
        toastSuccess("Orders fetch successfully");
      } else {
        toastFail("Error occurred");
      }
    },
    onError: (error) => {
      toastFail("Error fetching data:", error.message);
    },
  });
};

export { useFetchFoodData, useFetchMyOrderData };
