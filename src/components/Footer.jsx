import React from "react";
import {
  Stack,
  HStack,
  Link,
  Divider,
  Image,
  IconButton,
  Flex,
  Box,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { COLORS } from "../Constants/colors";

const links = [
  "Blog",
  "Documentation",
  "Careers",
  "Sign up",
  "Terms of use",
  "Privacy policy",
];
const accounts = [
  {
    url: "https://github.com/MA-Ahmad/templateskart",
    label: "Github Account",
    type: "gray",
    icon: <FaGithub />,
  },
  {
    url: "https://twitter.com/muhammad_ahmaad",
    label: "Twitter Account",
    type: "twitter",
    icon: <FaTwitter />,
  },
  {
    url: "https://linkedin.com/in/muhammad-ahmad20",
    label: "LinkedIn Account",
    type: "linkedin",
    icon: <FaLinkedin />,
  },
];

const Footer = () => {
  return (
    <Flex
      py={2}
      gap={12}
      alignItems={"center"}
      justifyContent={"center"}
      backgroundColor={"#000"}
      textAlign={"center"}
      color={COLORS.light2}
    >
      <VStack gap={1}>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          TastyTreat
        </Text>
        <Text>“Savor the flavor of every bite”</Text>
      </VStack>
      <VStack gap={2}>
        <Flex gap={4}>
          <Link href="/signup">Sign up</Link>
          <Link href="/login">Login</Link>
        </Flex>

        <HStack spacing={5} pt={{ base: 4, md: 0 }} alignItems="center">
          {accounts.map((sc, index) => (
            <IconButton
              key={index}
              as={Link}
              isExternal
              href={sc.url}
              aria-label={sc.label}
              colorScheme={sc.type}
              icon={sc.icon}
              rounded={"50%"}
              fontSize={"lg"}
              boxSize={8}
            />
          ))}
        </HStack>
      </VStack>
    </Flex>
  );
};

const CustomLink = ({ children, href, ...props }) => {
  return (
    <Link
      href={href}
      fontSize="sm"
      _hover={{ textDecoration: "underline" }}
      {...props}
    >
      {children}
    </Link>
  );
};

export default Footer;
