import {
  Container,
  VStack,
  Box,
  useColorModeValue,
  Input,
  Button,
  useToast,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { allUser } from "../store/user"; // Assuming the Zustand store is in "../store/user"
import { Link } from "react-router-dom";

const RegisterUser = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false); // Toggle state for visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const toast = useToast();
  const { registerUser } = allUser();

  const handleRegister = async () => {
    if (newUser.password !== newUser.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const { success, message } = await registerUser({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
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
      setNewUser({ name: "", email: "", password: "", confirmPassword: "" });
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
            Sign Up
          </Text>
          <Text fontWeight="medium" fontSize="lg" color="gray.500" mb={4}>
            Already have an account?{" "}
            <Text
              as="span"
              bgGradient={"linear(to-r, cyan.400, blue.500)"}
              bgClip={"text"}
              fontWeight="semibold"
              _hover={{ color: "teal.700" }} // Chakra hover effect
            >
              <Link to="/login">Sign In</Link>
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
              placeholder="Full Name"
              name="name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              size="lg"
              variant="flushed"
              _placeholder={{
                color: useColorModeValue("gray.500", "gray.400"),
              }}
              focusBorderColor="teal.400"
            />
            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              size="lg"
              variant="flushed"
              _placeholder={{
                color: useColorModeValue("gray.500", "gray.400"),
              }}
              focusBorderColor="teal.400"
            />
            {/* Password Field */}
            <InputGroup size="lg">
              <Input
                placeholder="Password"
                name="password"
                type={showPassword ? "text" : "password"} // Toggle type
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                variant="flushed"
                _placeholder={{
                  color: useColorModeValue("gray.500", "gray.400"),
                }}
                focusBorderColor="teal.400"
              />
              <InputRightElement>
                <Button
                  variant="ghost"
                  onClick={togglePasswordVisibility}
                  size="sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            {/* Confirm Password Field */}
            <InputGroup size="lg" mt={4}>
              <Input
                placeholder="Confirm Password"
                name="confirmPassword"
                type={showPassword ? "text" : "password"} // Toggle type
                value={newUser.confirmPassword}
                onChange={(e) =>
                  setNewUser({ ...newUser, confirmPassword: e.target.value })
                }
                variant="flushed"
                _placeholder={{
                  color: useColorModeValue("gray.500", "gray.400"),
                }}
                focusBorderColor="teal.400"
              />
              <InputRightElement>
                <Button
                  variant="ghost"
                  onClick={togglePasswordVisibility}
                  size="sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button
              bgGradient={"linear(to-r, cyan.400, blue.500)"}
              onClick={handleRegister}
              w={"full"}
              size="lg"
              py={6}
              borderRadius="md"
              _hover={{ textDecoration: "underline" }}
            >
              Register
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default RegisterUser;
