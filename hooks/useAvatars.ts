import { useQuery } from "@tanstack/react-query";
import { avatarApi } from "../axios/axiosApi";
import { Toast } from "native-base";

export function useAvatars() {
  const {
    data: avatarsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["avatars"],
    queryFn: async () => {
      try {
        const { data } = await avatarApi.get("/");
        // console.log(data);
        

        return data;
      } catch (err) {
        Toast.show({
          description: "Error bad request",
        });
        console.error("error from useAvatars", err, error);
      }
    },
  });

  return { avatarsData, isLoading, error };
}
