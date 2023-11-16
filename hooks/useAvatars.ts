import { useQuery } from "@tanstack/react-query";
import { avatarApi } from "../axios/axiosApi";

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

        return data;
      } catch (err) {
        console.error(err, error);
      }
    },
  });

  return { avatarsData, isLoading, error };
}
