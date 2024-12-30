import {
  Container,
  VStack,
  Text,
  SimpleGrid,
  Button,
  Box,
  Tooltip,
  HStack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import { allUser } from "../store/user";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const { token } = allUser();

  // Check if the user is logged in
  const isLoggedIn = Boolean(token);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Our Products
        </Text>

        {/* Message or Add New Product Button */}
        <Box mb={6} textAlign="center">
          {!isLoggedIn ? (
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="gray.600"
              textAlign="left"
            >
              You must log in to add new products.
            </Text>
          ) : (
            <HStack spacing={2}>
              <Tooltip label="Add a new product to the store">
                <Link to={"/login"}>
                  <Button
                    leftIcon={<AddIcon />}
                    bgGradient={"linear(to-r, blue.500, cyan.400)"}
                    _hover={""}
                  >
                    Add your own Product
                  </Button>
                </Link>
              </Tooltip>
              <Text fontWeight={"bold"} fontSize={"large"}>
                {" || "}
              </Text>
              <Tooltip label="View products from FakeAPIStore">
                <Link to="/external">
                  <Button
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    _hover={""}
                  >
                    External Products
                  </Button>
                </Link>
              </Tooltip>
            </HStack>
          )}
        </Box>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};
export default HomePage;
