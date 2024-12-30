import {
  Flex,
  Link,
  Text,
  Container,
  VStack,
  useColorModeValue,
  Divider, // Import Divider
} from "@chakra-ui/react";

const footerData = [
  {
    label: "Product Categories",
    href: "#",
    links: [
      { label: "Electronics", href: "#" },
      { label: "Clothing", href: "#" },
      { label: "Home & Kitchen", href: "#" },
      { label: "Beauty & Health", href: "#" },
    ],
  },
  {
    label: "Customer Service",
    href: "#",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Returns & Exchanges", href: "#" },
      { label: "Shipping Information", href: "#" },
      { label: "Order Tracking", href: "#" },
    ],
  },
  {
    label: "About Us",
    href: "#",
    links: [
      { label: "Our Story", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
  {
    label: "Follow Us",
    href: "#",
    links: [
      { label: "Instagram", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Pinterest", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
];

const Footer = () => {
  const value = useColorModeValue("gray.800", "gray.300");
  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      {/* Divider Line */}
      <Divider orientation="horizontal" my={6} />
      <VStack spacing={5} alignItems="initial">
        <Flex
          flexWrap="wrap"
          direction={{ base: "column", md: "row" }}
          alignItems="start"
          justifyContent="space-between"
        >
          {footerData.map((data, index) => (
            <Flex key={index} direction="column" mb="3">
              <Link fontWeight="500" href={data.href} color={value}>
                {data.label}
              </Link>
              <Flex direction={{ base: "row", md: "column" }}>
                {data.links.map((link, index) => (
                  <Link
                    key={index}
                    padding={1}
                    fontSize={{ base: "sm", sm: "md" }}
                    href="#"
                    mr={{ base: 1, sm: 2, md: 0 }}
                    color="gray.500"
                    _hover={{ color: "blue.600" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Flex>
            </Flex>
          ))}
        </Flex>

        {/* Divider Line */}
        <Divider orientation="horizontal" my={6} />
        {/* Footer Text */}
        <Flex alignItems="center">
          <Text color="gray.500" fontSize="0.875rem" pl="0.5rem">
            &copy; 2019 company, Inc. All rights reserved.
          </Text>
        </Flex>
      </VStack>
    </Container>
  );
};

export default Footer;
