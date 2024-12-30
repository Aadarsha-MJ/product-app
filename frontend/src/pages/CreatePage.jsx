import {
  Container,
  VStack,
  Text,
  Box,
  useColorModeValue,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();

  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
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
    }
    setNewProduct({ name: "", price: "", image: "" });
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
            Create New Product
          </Text>
          <Text fontWeight="medium" fontSize="lg" color="gray.500" mb={4}>
            Fill in the details below to add a new product to the store.
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
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              size="lg"
              variant="flushed"
              _placeholder={{
                color: useColorModeValue("gray.500", "gray.400"),
              }}
              focusBorderColor="teal.400"
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              size="lg"
              variant="flushed"
              _placeholder={{
                color: useColorModeValue("gray.500", "gray.400"),
              }}
              focusBorderColor="teal.400"
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
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
              onClick={handleAddProduct}
              w={"full"}
              size="lg"
              py={6}
              borderRadius="md"
              _hover={{ textDecoration: "underline" }}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};
export default CreatePage;
