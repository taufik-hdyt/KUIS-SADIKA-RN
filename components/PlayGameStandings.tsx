import {
  Alert,
  Avatar,
  Box,
  HStack,
  Stack,
  Text,
} from "native-base";
import { useUserProfile } from "../hooks/useUserProfile";

type ToastStandingProps = {
  id: string;
  title: string;
  variant?: string;
  status?: string;
  correctAnswer?: string
};

export const ToastStanding = ({
  id,
  title,
  variant,
  status,
  correctAnswer
}: ToastStandingProps) => {
  const { isLoading, userData } = useUserProfile();
  return (
    <Alert
      minW="300px"
      alignSelf="center"
      flexDirection="row"
      status={status ? status : "info"}
      variant={variant}
    >
     <Box w="full">
      <Box p={2}>
        <Text fontWeight="semibold" fontSize="lg" textAlign="center">
          Answer Results
        </Text>
        <Text
          py={1}
          rounded="lg"
          color="white"
          bg="green.400"
          w="200px"
          mb={3}
          textAlign="center"
          mx="auto"
        >
          Correct Answer : <Text fontWeight="semibold">{correctAnswer}</Text>
        </Text>
        <Stack space={2}>
          {Array.from({ length: 3 }, (_, idx) => (
            <HStack
              key={idx}
              space={3}
              alignItems="center"
              p={2}
              bg="blue.100"
              rounded="lg"
            >
              <Avatar
                source={{
                  uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                }}
              />
              <Stack>
                <Text fontWeight="semibold" fontSize="lg" textAlign="center">
                  Player 1
                </Text>
                <Text textAlign="center">Answer : test</Text>
              </Stack>
            </HStack>
          ))}
        </Stack>
      </Box>
    </Box>
    </Alert>
  );
};

export default ToastStanding;
