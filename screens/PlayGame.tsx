import React from "react";
import Layout from "../components/Layout";
import { Box, Center, HStack, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";


type inputProps ={
  length: string
  value: Array<string>
  disabled:boolean
  onChange(value: Array<string>): void
}

export default function PlayGame() {
  return (
    <Layout isCenter>
      <SafeAreaView>
      <Box p={6}>
        <Box rounded="xl" h="100%" bg="black"  px={3} opacity="0.8">
          <Center mt={20} >
            <HStack alignItems="center" space={3} bg="#D9D9D9" rounded="full" pr={6}>
            <Text textAlign="center" p={2} rounded="full" bg="#2075B8" color="white" fontSize="3xl">18s
            </Text>
            <Text fontWeight="semibold" fontSize="lg" color="black">Player Remaining : <Text color="#FA9711">20</Text></Text>
            </HStack>
          </Center>

          <Text  fontWeight="semibold" fontSize="lg" textAlign="center" rounded="lg" mt={10} bg="gray.100" p={3}>Selain mobil, bus, pesawat, orang pergi dari Jakarta ke Surabaya biasanya menggunakan?</Text>
        </Box>
      </Box>

      </SafeAreaView>
    </Layout>
  );
}


// const inputAnswer
