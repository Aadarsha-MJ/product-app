// import {
//   Container,
//   Flex,
//   HStack,
//   Text,
//   Button,
//   useColorMode,
// } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import { PlusSquareIcon, ExternalLinkIcon } from "@chakra-ui/icons";
// import { IoMoon } from "react-icons/io5";
// import { LuSun } from "react-icons/lu";
// import LogoutUser from "./LogoutUser";

// const Navbar = () => {
//   const { colorMode, toggleColorMode } = useColorMode();
//   return (
//     <Container maxW={"1140px"} px={4}>
//       <Flex
//         h={16}
//         alignItems={"center"}
//         justifyContent={"space-between"}
//         flex={{
//           base: "column",
//           sm: "row",
//         }}
//       >
//         <Text
//           fontSize={{ base: "22", sm: "28" }}
//           fontWeight={"bold"}
//           textTransform={"uppercase"}
//           textAlign={"center"}
//           bgGradient={"linear(to-r, cyan.400, blue.500)"}
//           bgClip={"text"}
//         >
//           <Link to={"/"}>Product Store 🛒</Link>
//         </Text>
//         <HStack spacing={2} alignItems={"center"}>
//           <Link to={"/create"}>
//             <Button>
//               <PlusSquareIcon fontSize={20} />
//             </Button>
//           </Link>
//           <Button onClick={toggleColorMode}>
//             {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
//           </Button>
//           <Link to={"/external"}>
//             <Button>
//               <ExternalLinkIcon fontSize={20}></ExternalLinkIcon>
//             </Button>
//           </Link>
//           <Link to={"/register"}>
//             <Button>
//               <ExternalLinkIcon fontSize={20}></ExternalLinkIcon>
//             </Button>
//           </Link>
//           <Link to={"/login"}>
//             <Button>
//               <ExternalLinkIcon fontSize={20}></ExternalLinkIcon>
//             </Button>
//           </Link>
//         </HStack>
//       </Flex>
//     </Container>
//   );
// };
// export default Navbar;

import {
  Container,
  Flex,
  HStack,
  Text,
  Button,
  useColorMode,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import LogoutUser from "./LogoutUser";
import { allUser } from "../store/user";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../store/cart.js";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { token } = allUser(); // Access token to check login state
  const cartCount = useCartStore((state) => state.cartCount(state)); // Get cart count from the store

  // Check if the user is logged in
  const isLoggedIn = Boolean(token);

  return (
    <Container maxW={"1800px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flex={{
          base: "column",
          sm: "row",
        }}
      >
        <HStack spacing={8} alignItems="center">
          <Text
            fontSize={{ base: "22px", sm: "28px" }}
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            bgGradient="linear(to-r, cyan.400, blue.500)"
            bgClip="text"
          >
            <Link to="/">STORE 🛒</Link>
          </Text>

          {/* Navigation Links */}
          <HStack spacing={6}>
            <Link to="/">
              <Text
                fontSize="lg"
                bgGradient="linear(to-r, cyan.400, blue.500)"
                bgClip="text"
                fontWeight="medium"
                _hover={{ textDecoration: "underline", color: "cyan.500" }}
              >
                Home
              </Text>
            </Link>
            <Link to="/home">
              <Text
                fontSize="lg"
                bgGradient="linear(to-r, cyan.400, blue.500)"
                bgClip="text"
                fontWeight="medium"
                _hover={{ textDecoration: "underline", color: "cyan.500" }}
              >
                Products
              </Text>
            </Link>
          </HStack>
        </HStack>
        {/* Navigation Links */}
        {/* Navigation Links */}
        <HStack spacing={6} alignItems={"center"}>
          {/* Add Product Button */}
          {isLoggedIn && (
            <Tooltip label="Add new product">
              <Link to={"/create"}>
                <Button>
                  <PlusSquareIcon fontSize={20} />
                </Button>
              </Link>
            </Tooltip>
          )}

          {/* Dark/Light Mode Toggle */}
          <Tooltip label="Toogle Theme">
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? (
                <IoMoon size="20" />
              ) : (
                <LuSun size="20" />
              )}
            </Button>
          </Tooltip>

          {/* Cart Button */}
          <Link to={"/cart"}>
            <Button position="relative">
              <FaShoppingCart />
              {cartCount > 0 && (
                <Badge
                  colorScheme="red"
                  position="absolute"
                  top={-1}
                  right={-1}
                  fontSize="sm"
                  borderRadius="full"
                  padding="0.3rem"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Login/Logout */}
          {!isLoggedIn ? (
            <Link to={"/login"}>
              <Button
                bgGradient="linear(to-r, cyan.400, blue.500)"
                _hover={{ bgGradient: "linear(to-r, cyan.800, blue.900)" }}
              >
                Sign In
              </Button>
            </Link>
          ) : (
            <LogoutUser />
          )}
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
