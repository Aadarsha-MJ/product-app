import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  Image,
} from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Link } from "react-router-dom";

function IndexPage() {
  return (
    <Box p={4} textAlign="center">
      <Heading
        as="h1"
        size="2xl"
        mb={6}
        bgGradient="linear(to-r, teal.400, blue.500)"
        bgClip="text"
      >
        Welcome to Our Store
      </Heading>
      <Text
        fontSize="lg"
        mb={8}
        bgGradient="linear(to-r, teal.400, blue.500)"
        bgClip="text"
      >
        Explore an exclusive selection of top-notch products, curated to elevate
        your lifestyle and meet your every need.
      </Text>
      {/* Carousel Component */}
      <Flex justify="center" align="center" mb={12}>
        <Carousel
          infiniteLoop
          autoPlay
          showThumbs={false}
          showIndicators={false}
        >
          <div>
            <Image
              src="https://images.unsplash.com/photo-1507679622673-989605832e3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Product 1"
              borderRadius="md"
              maxWidth="1500px"
              height="700px"
              objectFit="cover"
            />
          </div>
          <div>
            <Image
              src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Product 2"
              borderRadius="md"
              maxWidth="1500px"
              height="700px"
              objectFit="cover"
            />
          </div>
          <div>
            <Image
              src="https://images.unsplash.com/photo-1716978499366-d5a84bf1fe70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Product 3"
              borderRadius="md"
              maxWidth="1500px"
              height="700px"
              objectFit="cover"
            />
          </div>
        </Carousel>
      </Flex>

      <VStack spacing={4}>
        <Link to={"/home"}>
          <Button colorScheme="teal" size="lg">
            Shop Now
          </Button>
        </Link>

        <Button colorScheme="blue" variant="outline" size="lg">
          Learn More
        </Button>
      </VStack>
    </Box>
  );
}

export default IndexPage;
