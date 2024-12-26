import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Card,
  Image,
  Heading,
  Stack,
  Divider,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useFetchMyOrderData } from "../service/DisplayFoodData";
import { CardBody, Badge, Icon } from "@chakra-ui/react";
import { FaShoppingBag, FaTag } from "react-icons/fa";
import { COLORS } from "../Constants/colors";

const MyOrder = () => {
  const [orderData, setOrderData] = useState([]);
  const {
    mutateAsync: myOrderData,
    isLoading,
    isError,
  } = useFetchMyOrderData();

  const fetchMyOrder = async () => {
    try {
      const body = {
        email: localStorage.getItem("userEmail"),
      };
      const response = await myOrderData(body);
      setOrderData(response?.data?.orderData?.order_data || []);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <Box
      backgroundImage="url('https://img.freepik.com/premium-photo/space-cheese-background-fast-baked-meal-food-black-tomato-pizza-italian-copy-food_729149-151844.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundAttachment="fixed"
      py={10}
    >
      <Container maxW={{ base: "100%", xl: "80%" }}>
        {isLoading ? (
          <Flex justify="center" align="center" height="400px">
            <Spinner size="xl" color="teal.500" />
          </Flex>
        ) : isError || orderData.length === 0 ? (
          <Flex justify="center" align="center" height="400px">
            <Text fontSize="2xl" color="gray.600" fontWeight="bold">
              No orders found.
            </Text>
          </Flex>
        ) : (
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
            {orderData
              .slice(0)
              .reverse()
              .map((orderGroup, index) => (
                <Card
                  key={index}
                  boxShadow="lg"
                  borderRadius="xl"
                  overflow="hidden"
                  // bg="white"
                  bg={COLORS.light2}
                  _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
                >
                  <CardBody p={6}>
                    {/* Display Order Date once per card */}
                    {orderGroup[0]?.Order_date && (
                      <Stack
                        spacing={2}
                        mb={4}
                        align="center"
                        position="relative"
                      >
                        <Icon as={FaShoppingBag} boxSize={8} color="teal.500" />
                        <Text fontSize="lg" fontWeight="bold" color="teal.600">
                          {new Date(
                            orderGroup[0].Order_date
                          ).toLocaleDateString()}
                        </Text>
                        <Divider borderColor="teal.300" />
                      </Stack>
                    )}

                    {/* Map through actual items */}
                    {orderGroup.map((item, itemIndex) => (
                      <Box key={itemIndex} mb={6}>
                        {/* Check if it's not the date object */}
                        {!item.Order_date && (
                          <Stack spacing={5}>
                            <Flex justify="space-between" align="center">
                              <Heading
                                size="md"
                                color="gray.700"
                                // textAlign="center"
                              >
                                {item.name}
                              </Heading>
                              <Text
                                fontWeight="bold"
                                fontSize="lg"
                                color="teal.700"
                                display="flex"
                                alignItems="center"
                              >
                                <Icon as={FaTag} boxSize={4} mr={2} />₹
                                {item.price}/-
                              </Text>
                            </Flex>
                            <Flex justify="space-between" align="center">
                              <Badge
                                colorScheme="purple"
                                px={2}
                                py={1}
                                borderRadius="lg"
                              >
                                Qty: {item.qty}
                              </Badge>
                              <Badge
                                colorScheme="blue"
                                px={2}
                                py={1}
                                borderRadius="lg"
                              >
                                Size: {item.size}
                              </Badge>
                            </Flex>
                          </Stack>
                        )}
                      </Box>
                    ))}
                  </CardBody>
                </Card>
              ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default MyOrder;
