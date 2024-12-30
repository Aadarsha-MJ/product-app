import { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Spinner,
  VStack,
  Container,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";

const ExternalPage = () => {
  const [products, setProducts] = useState([]); // State to hold products data
  const [loading, setLoading] = useState(true); // State to track loading status
  const bg = useColorModeValue("white", "gray.800"); // Background color based on color mode
  const textColor = useColorModeValue("gray.600", "gray.200"); // Text color based on color mode

  // Fetch products from external API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products"); // Fetch data from API
        const data = await response.json(); // Parse response as JSON
        setProducts(data); // Update state with fetched products
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching products:", error); // Log any errors
        setLoading(false); // Set loading to false in case of an error
      }
    };
    fetchProducts(); // Call fetchProducts function on component mount
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

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
          External Products 🚀
        </Text>
        {loading ? (
          <Spinner size="md" />
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
            {products.map((product) => (
              <Box
                key={product.id}
                shadow="lg"
                rounded="lg"
                overflow="hidden"
                transition="all 0.3s"
                _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
                bg={bg}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  h={500}
                  w="full"
                  objectFit="cover"
                />
                {/* <Text fontWeight="bold" noOfLines={1}>
                  {product.title}
                </Text>
                <Text>${product.price}</Text> */}
                <Box p={4}>
                  <Heading as="h3" size="md" mb={2}>
                    {product.title}
                  </Heading>
                  <Text
                    fontWeight="bold"
                    fontSize="xl"
                    color={textColor}
                    mb={4}
                  >
                    ${product.price}
                  </Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default ExternalPage;
