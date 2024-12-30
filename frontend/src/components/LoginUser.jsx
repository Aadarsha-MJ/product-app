import {
  Container,
  VStack,
  Box,
  useColorModeValue,
  Input,
  Button,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { allUser } from "../store/user.js";
import { Link, useNavigate } from "react-router-dom";

const LoginUser = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const toast = useToast();
  const { loginUser } = allUser();
  const navigate = useNavigate(); // React Router hook for navigation

  const handleLogin = async () => {
    const { success, message } = await loginUser({
      email: credentials.email,
      password: credentials.password,
    });

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
      setCredentials({ email: "", password: "" });
      navigate("/home");
    }
  };

  return (
    <Container maxW={"lg"} py={12} px={6}>
      <VStack spacing={8}>
        <Box width="100%" textAlign="left">
          <Text
            fontSize={{ base: "3xl", sm: "4xl" }}
            fontWeight="bold"
            mb={4}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
          >
            Sign In
          </Text>
          <Text fontWeight="medium" fontSize="lg" color="gray.500" mb={4}>
            New user?{" "}
            <Text
              as="span"
              bgGradient={"linear(to-r, cyan.400, blue.500)"}
              bgClip={"text"}
              fontWeight="semibold"
              _hover={{ color: "teal.700" }} // Chakra hover effect
            >
              <Link to="/register">Create an account</Link>
            </Text>
          </Text>
        </Box>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.700")}
          p={8}
          rounded={"lg"}
          shadow={"xl"}
          borderWidth={1}
          borderColor={useColorModeValue("gray.200", "gray.600")}
        >
          <VStack spacing={6}>
            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              size="lg"
              variant="flushed"
              _placeholder={{
                color: useColorModeValue("gray.500", "gray.400"),
              }}
              focusBorderColor="teal.400"
            />
            <Input
              placeholder="Password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              size="lg"
              variant="flushed"
              _placeholder={{
                color: useColorModeValue("gray.500", "gray.400"),
              }}
              focusBorderColor="teal.400"
            />
            <Button
              bgGradient={"linear(to-r, cyan.400, blue.500)"}
              onClick={handleLogin}
              w={"full"}
              size="lg"
              py={6}
              borderRadius="md"
              _hover={{ textDecoration: "underline" }}
            >
              Login
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default LoginUser;
