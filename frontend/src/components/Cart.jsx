import {
  Container,
  VStack,
  HStack,
  Box,
  Text,
  Button,
  IconButton,
  Input,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useCartStore } from "../store/cart.js";
import { CiCircleRemove } from "react-icons/ci";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const toast = useToast();
  const boxBg = useColorModeValue("white", "gray.700");

  // Calculate total quantity and total price
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2); // Keep two decimal points for the price

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart Cleared",
      description: "Your cart has been cleared successfully.",
      status: "success",
      isClosable: true,
    });
  };

  const handleProceedToCheckout = () => {
    toast({
      title: "Proceeding to Checkout",
      description: "Redirecting to the checkout page.",
      status: "info",
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={6}>
        {/* Cart Heading */}
        <Text
          fontSize="4xl"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          Your Cart ({totalQuantity} items)
        </Text>

        {cart.length === 0 ? (
          <Text color="gray.500">Your cart is empty.</Text>
        ) : (
          <>
            {/* Cart Items Box */}
            <Box p={4} borderWidth="1px" borderRadius="md" bg={boxBg} w="full">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Item</Th>
                    <Th>Price</Th>
                    <Th>Quantity</Th>
                    <Th width="150px">Total</Th>{" "}
                    {/* Fixed width for Total column header */}
                    {/* Fixed width for Total header */}
                  </Tr>
                </Thead>
                <Tbody>
                  {cart.map((item) => (
                    <Tr key={item._id}>
                      {/* Item Column */}
                      <Td>
                        <HStack spacing={4}>
                          <Image
                            boxSize="50px"
                            objectFit="cover"
                            src={item.image}
                            alt={item.name}
                          />
                          <Text fontWeight="bold">{item.name}</Text>
                        </HStack>
                      </Td>

                      {/* Price Column */}
                      <Td>${item.price.toFixed(2)}</Td>

                      {/* Quantity Column */}
                      <Td>
                        <Input
                          type="number"
                          size="sm"
                          value={item.quantity === 0 ? "" : item.quantity}
                          onChange={(e) => {
                            const newQuantity =
                              e.target.value === ""
                                ? 0
                                : parseInt(e.target.value, 10);
                            updateQuantity(item._id, newQuantity);
                          }}
                          min="0"
                          max="99"
                        />
                      </Td>

                      {/* Total Column */}
                      <Td>
                        <HStack
                          spacing={2}
                          justify="space-between"
                          align="center"
                        >
                          <Text>{(item.price * item.quantity).toFixed(2)}</Text>
                          {/* Delete Icon */}
                          <IconButton
                            icon={<CiCircleRemove />}
                            onClick={() => removeFromCart(item._id)}
                            aria-label="Remove Item"
                            size="lg"
                            variant="ghost"
                            alignSelf="center" // Ensures consistent vertical alignment
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              {/* Clear Cart Button */}
              <HStack justify="flex-end" mt={5} mr={12} spacing={4}>
                <Button
                  colorScheme="red"
                  onClick={handleClearCart}
                  size="md"
                  borderRadius="md"
                >
                  Clear Cart
                </Button>
              </HStack>
            </Box>

            {/* Cart Summary Box */}
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="md"
              bg={boxBg}
              w={{ base: "full", md: "40%" }}
              alignSelf={{ base: "center", md: "flex-end" }}
            >
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Text fontWeight="bold">Total Quantity:</Text>
                  <Text>{totalQuantity}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontWeight="bold" fontSize="lg">
                    Total Price:
                  </Text>
                  <Text fontSize="lg">${totalPrice}</Text>
                </HStack>
              </VStack>

              {/* Action Buttons */}
              <VStack spacing={4} mt={6}>
                <Button
                  colorScheme="blue"
                  onClick={handleProceedToCheckout}
                  w="full"
                >
                  Proceed to Checkout
                </Button>
              </VStack>
            </Box>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default Cart;
