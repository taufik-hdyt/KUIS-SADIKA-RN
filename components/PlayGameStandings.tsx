import {
  Alert,
  Button,
  Center,
  CloseIcon,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
  View,
  useToast,
} from "native-base";
import { useUserProfile } from "../hooks/useUserProfile";

type ToastStandingProps = {
  id: string;
  title: string;
  variant?: string;
  status?: string;
};

export const ToastStanding = ({
  id,
  title,
  variant,
  status,
}: ToastStandingProps) => {
  const { isLoading, userData } = useUserProfile();
  return (
    <Alert
      maxWidth="90%"
      height="660px"
      alignSelf="center"
      flexDirection="row"
      status={status ? status : "info"}
      variant={variant}
    >
      <VStack w="100%">
        <HStack alignItems="center" justifyContent={"center"}>
          <Text
            fontSize="md"
            fontWeight="medium"
            color={
              variant === "solid"
                ? "lightText"
                : variant !== "outline"
                ? "darkText"
                : null
            }
          >
            {title}
          </Text>
        </HStack>

        <View mx={2}>
          {/* <Text
            color={
              variant === "solid"
                ? "lightText"
                : variant !== "outline"
                ? "darkText"
                : null
            }
          >
            {description}
          </Text> */}
          <View>
            <HStack
              borderColor="white"
              borderStyle="solid"
              borderWidth="2px"
              p={1.5}
              w="280px"
              rounded="lg"
              bg="gray.600"
              alignItems="center"
              space={3}
            >
              <Text color="white">1</Text>
              <Image
                borderRadius={50}
                resizeMode="contain"
                style={{ width: 45, height: 45 }}
                alt="profile"
                source={{ uri: userData?.avatar }}
              />
              <Text fontSize="lg" color="white" fontWeight="semibold">
                {userData?.username}
              </Text>
            </HStack>
            {Array.from({ length: 4 }, (_, index) => (
              <HStack
                key={index}
                borderColor="white"
                borderStyle="solid"
                borderWidth="2px"
                p={1.5}
                space={3}
                w="280px"
                rounded="lg"
                bg="gray.600"
                alignItems="center"
              >
                <Text color="white">{index + 2}</Text>
                <Image
                  style={{ width: 50, height: 50 }}
                  alt="profile"
                  source={require("../assets/avatar.png")}
                />
                <Text fontSize="lg" color="white" fontWeight="semibold">
                  Molusca_Bertulang
                </Text>
              </HStack>
            ))}
          </View>
        </View>
      </VStack>
    </Alert>
  );
};

export default ToastStanding;
