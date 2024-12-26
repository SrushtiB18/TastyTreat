// import React from "react";
// import {
//   Box,
//   Flex,
//   Text,
//   Button,
//   Link,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import ModalComponent from "./Modal";
// import Cart from "../screens/Cart";
// import { useCart } from "./ContextReducer";

// const NavBar = (props) => {
//   const [isOpen, setIsOpen] = React.useState(false);

//   const toggle = () => setIsOpen(!isOpen);

//   return (
//     <NavBarContainer {...props} backgroundColor={"#921A40"}>
//       <MenuToggle toggle={toggle} isOpen={isOpen} />
//       <MenuLinks isOpen={isOpen} />
//     </NavBarContainer>
//   );
// };

// const CloseIcon = () => (
//   <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
//     <title>Close</title>
//     <path
//       fill="white"
//       d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
//     />
//   </svg>
// );

// const MenuIcon = () => (
//   <svg
//     width="24px"
//     viewBox="0 0 20 20"
//     xmlns="http://www.w3.org/2000/svg"
//     fill="white"
//   >
//     <title>Menu</title>
//     <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
//   </svg>
// );

// const MenuToggle = ({ toggle, isOpen }) => {
//   return (
//     <Box display={{ base: "block", md: "none" }} onClick={toggle}>
//       {isOpen ? <CloseIcon /> : <MenuIcon />}
//     </Box>
//   );
// };

// const MenuLinks = ({ isOpen }) => {
//   let data = useCart();

//   const {
//     isOpen: isCartOpen,
//     onOpen: onCartOpen,
//     onClose: onCartClose,
//   } = useDisclosure();
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/login");
//   };
//   return (
//     <Flex
//       justifyContent={"space-between"}
//       width={"100%"}
//     >
//       <Flex gap={4}>
//         <Text fontSize={"22px"} fontWeight={"bold"}>
//           TastyTreat
//         </Text>
//         <Link href="/" mt={2}>
//           Home
//         </Link>
//         {localStorage.getItem("authToken") ? (
//           <Link href="/my-order" mt={2}>
//             My Orders
//           </Link>
//         ) : (
//           ""
//         )}

//       </Flex>

//       {!localStorage.getItem("authToken") ? (
//         <Flex gap={2}>
//           <Link href="/signup" isLast>
//             <Button
//               size="sm"
//               rounded="md"
//               color={"black"}
//               bg={"white"}
//               _hover={{
//                 bg: "gray.200",
//               }}
//             >
//               Sign Up
//             </Button>
//           </Link>
//           <Link href="/login">
//             <Button
//               size="sm"
//               rounded="md"
//               color={"black"}
//               bg={"white"}
//               _hover={{
//                 bg: "gray.200",
//               }}
//             >
//               Login
//             </Button>
//           </Link>
//         </Flex>
//       ) : (
//         <Flex gap={2}>
//           <Button
//             size="sm"
//             rounded="md"
//             color={"white"}
//             bg={"blue.500"}
//             _hover={{
//               bg: "blue.600",
//             }}
//             onClick={onCartOpen}
//           >
//             My Cart {data?.length > 0 && `(${data?.length})`}
//           </Button>
//           <ModalComponent
//             modalOpen={isCartOpen}
//             onClose={onCartClose}
//             modalTitle="My Cart"
//             size={"6xl"}
//           >
//             <Cart />
//           </ModalComponent>
//           <Button
//             size="sm"
//             rounded="md"
//             color={"white"}
//             bg={"red.500"}
//             _hover={{
//               bg: "red.600",
//             }}
//             onClick={handleLogout}
//           >
//             Logout
//           </Button>
//         </Flex>
//       )}
//     </Flex>
//   );
// };

// const NavBarContainer = ({ children, ...props }) => {
//   return (
//     <Flex
//       as="nav"
//       align="center"
//       justify="space-between"
//       wrap="wrap"
//       w="100%"
//       py={4}
//       px={8}
//       bg={"black"}
//       color={"white"}
//       position="sticky"
//       top={0}
//       zIndex={10}
//       {...props}
//     >
//       {children}
//     </Flex>
//   );
// };

// export default NavBar;

import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Link,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
import ModalComponent from "./Modal";
import { COLORS } from "../Constants/colors";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose,
  } = useDisclosure();
  const navigate = useNavigate();
  const data = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // Chakra UI Drawer for Mobile Menu
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      py={4}
      px={{ base: 4, md: 8 }}
      bg={COLORS.primary}
      color={"white"}
      position="sticky"
      top={0}
      zIndex={10}
      {...props}
    >
      {/* Mobile Hamburger Toggle */}

      <Flex justifyContent={"space-between"} width={"100%"}>
        {/* Logo */}
        <Flex justifyContent={"space-between"} width={"100%"}>
          <Flex gap={4}>
            <Text fontSize={"22px"} fontWeight={"bold"}>
              TastyTreat
            </Text>
            <Link href="/" mt={2}>
              Home
            </Link>
            {localStorage.getItem("authToken") ? (
              <Link href="/my-order" mt={2}>
                My Orders
              </Link>
            ) : (
              ""
            )}
          </Flex>
          <Box display={{ base: "block", md: "none" }} onClick={onDrawerOpen}>
            <svg
              width="24px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </Box>
        </Flex>

        {/* Links on larger screens */}
        <Flex display={{ base: "none", md: "flex" }} gap={4}>
          {/* <Link href="/" mt={2}>
            Home
          </Link>
          {localStorage.getItem("authToken") && (
            <Link href="/my-order" mt={2}>
              My Orders
            </Link>
          )} */}
          {!localStorage.getItem("authToken") ? (
            <Flex gap={2}>
              <Link href="/signup" isLast>
                <Button
                  size="sm"
                  rounded="md"
                  color={"black"}
                  bg={"white"}
                  _hover={{ bg: "gray.200" }}
                >
                  Sign Up
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="sm"
                  rounded="md"
                  color={"black"}
                  bg={"white"}
                  _hover={{ bg: "gray.200" }}
                >
                  Login
                </Button>
              </Link>
            </Flex>
          ) : (
            <Flex gap={2}>
              <Button
                size="sm"
                rounded="md"
                color={"white"}
                bg={"blue.500"}
                _hover={{ bg: "blue.600" }}
                onClick={onCartOpen}
              >
                My Cart {data?.length > 0 && `(${data?.length})`}
              </Button>
              <ModalComponent
                modalOpen={isCartOpen}
                onClose={onCartClose}
                modalTitle="My Cart"
                size={"6xl"}
              >
                <Cart />
              </ModalComponent>
              <Button
                size="sm"
                rounded="md"
                color={"white"}
                bg={"red.500"}
                _hover={{ bg: "red.600" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>

      {/* Chakra UI Drawer for Mobile */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={onDrawerClose}
        placement={"right"}
        size={"full"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text fontSize={"2xl"} fontWeight="bold">
              TastyTreat
            </Text>
          </DrawerHeader>
          <DrawerBody>
            {/* <Link href="/" display="block" mb={2}>
              Home
            </Link>
            {localStorage.getItem("authToken") && (
              <Link href="/my-order" display="block" mb={2}>
                My Orders
              </Link>
            )} */}
            {!localStorage.getItem("authToken") ? (
              <>
                <Link href="/signup" display="block" mb={2}>
                  <Button
                    size="sm"
                    rounded="md"
                    color={"black"}
                    bg={"white"}
                    _hover={{ bg: "gray.200" }}
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link href="/login" display="block">
                  <Button
                    size="sm"
                    rounded="md"
                    color={"black"}
                    bg={"white"}
                    _hover={{ bg: "gray.200" }}
                  >
                    Login
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  rounded="md"
                  color={"white"}
                  bg={"blue.500"}
                  _hover={{ bg: "blue.600" }}
                  onClick={onCartOpen}
                  w="100%"
                >
                  My Cart {data?.length > 0 && `(${data?.length})`}
                </Button>
                <ModalComponent
                  modalOpen={isCartOpen}
                  onClose={onCartClose}
                  modalTitle="My Cart"
                  size={"6xl"}
                >
                  <Cart />
                </ModalComponent>
                <Button
                  size="sm"
                  rounded="md"
                  color={"white"}
                  bg={"red.500"}
                  _hover={{ bg: "red.600" }}
                  onClick={handleLogout}
                  w="100%"
                >
                  Logout
                </Button>
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default NavBar;
