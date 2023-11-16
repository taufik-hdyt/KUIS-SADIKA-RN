import { useQuery } from "@tanstack/react-query";
import { avatarApi } from "../axios/axiosApi";

export function useAvatars() {
  const {
    data: avatarsData,
    isLoading,
    error,
  } = useQuery({
    queryFn: async () => {
      try {
        const { data } = await avatarApi.get("/");
        return data;
      } catch (err) {
        console.error(err, error);
      }
    },
    queryKey: ["avatars"],
  });

  return { avatarsData, isLoading, error };
}
