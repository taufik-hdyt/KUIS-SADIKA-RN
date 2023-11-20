import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "native-base";
import { useState } from "react";
import { UserApi } from "../axios/axiosApi";
import { useUser } from "@clerk/clerk-expo";

export function useUpdateProfile() {
  const { isSignedIn, user } = useUser();
  if (!isSignedIn) {
    console.log("not signed in");
  }
  const userEmail = user?.primaryEmailAddress.emailAddress;
  const toast = useToast();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    username: "",
    email: userEmail,
    avatar:
      "",
  });

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: async () => {
      return await UserApi.post("/", form);
    },
    onSuccess: () => {
      toast.show({
        description: "Hello world",
      });
      queryClient.invalidateQueries({ queryKey: ["avatars"] });
    },
    onError: (err) => {
      console.log(err);
      toast.show({
        description: "Error bad request",
      });
    },
  });

  return {
    updateUser,
    isUpdating,
    form,
    setForm,
  };
}
