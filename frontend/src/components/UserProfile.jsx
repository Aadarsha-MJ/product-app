import { useEffect } from "react";
import { allUser } from "../store/user"; // Import your Zustand store
import {
  useToast,
  Container,
  Box,
  Text,
  VStack,
  Button,
  Avatar,
} from "@chakra-ui/react";

const UserProfile = () => {
  const { userDetails, fetchUserDetails } = allUser(); // Access the user details and fetch function
  const toast = useToast();

  useEffect(() => {
    const loadUserDetails = async () => {
      const { success, message } = await fetchUserDetails();
      if (!success) {
        toast({
          title: "Error",
          description: message,
          status: "error",
          isClosable: true,
        });
      }
    };

    loadUserDetails();
  }, [fetchUserDetails, toast]);

  if (!userDetails) {
    return <Text>Loading user details...</Text>;
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="center">
        <Avatar
          name={userDetails.name}
          src={userDetails.avatar || ""}
          size="xl"
        />
        <Box bg="white" p={6} rounded="md" shadow="md" w="full" maxW="lg">
          <VStack spacing={4} align="start">
            <Text fontSize="2xl" fontWeight="bold">
              {userDetails.name}
            </Text>
            <Text fontSize="lg" color="gray.500">
              {userDetails.email}
            </Text>

            {/* You can display more user details here */}
            <Button
              colorScheme="red"
              variant="outline"
              onClick={() => {
                // Add logic to log out if needed
              }}
            >
              Log Out
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default UserProfile;
