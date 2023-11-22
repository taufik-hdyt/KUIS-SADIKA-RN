import { useQuery } from "@tanstack/react-query";
import { questionsApi } from "../axios/axiosApi";
import { Toast } from "native-base";

export function useQuestions() {
  const {
    data: questionsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      try {
        const { data } = await questionsApi.get("/");
        return data
      } catch (err) {
        Toast.show({
          description: "Error bad request",
        });
        console.error("error from useQuestions", err, error);
      }
    },
  });
  

  return { questionsData, isLoading, error };
}

