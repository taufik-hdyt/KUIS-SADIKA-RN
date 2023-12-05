import { useQuery } from "@tanstack/react-query";
import { getUserApi } from "../axios/axiosApi";
import { Toast } from "native-base";
import { useUser } from "@clerk/clerk-expo";

type UserData = {
  avatar: string;
  email: string;
  id: string;
  username: string;
  diamond: number
};

export function useUserProfile() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (isLoaded && !isSignedIn) {
    console.log("not signed in");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userEmail = user?.primaryEmailAddress.emailAddress;
  // ${userEmail}
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { data } = await getUserApi.get("/");
        // console.log("log from useUserProfile", data);

        return data as UserData;
      } catch (err) {
        Toast.show({
          description: "Server Error",
        });
        console.error("error from useAvatars", err, error);
      }
    },
  });

  return { userData, isLoading, error };
}
