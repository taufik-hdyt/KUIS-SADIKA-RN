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
        console.log(data);
        
        return data;
      } catch (err) {
        console.error(err, error);
        return [];
      }
    },
  });

  return { avatarsData, isLoading, error };
}
