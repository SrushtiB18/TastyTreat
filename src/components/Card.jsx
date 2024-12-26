import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card as ChakraCard,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Select,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import { FaCartArrowDown } from "react-icons/fa";
import { useCart, useDispatchCart } from "./ContextReducer";
import { useRef } from "react";
import { COLORS } from "../Constants/colors";

const Card = ({ item }) => {
  let dispatch = useDispatchCart();
  let options = item.options[0];
  let priceOptions = Object.keys(options);
  let data = useCart();
  const priceRef = useRef();
  console.log("item", item);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions?.[0] || "");

  // const handleAddToCart = async () => {
  //   let food = [];
  //   for (const item of data) {
  //     if (item.id === item._id) {
  //       food = item;
  //       break;
  //     }
  //   }
  //   if (food.length > 0) {
  //     if (food.size === size) {
  //       await dispatch({
  //         type: "UPDATE",
  //         id: item._id,
  //         price: finalPrice,
  //         qty: qty,
  //       });
  //       return;
  //     } else if (food.size !== size) {
  //       await dispatch({
  //         type: "ADD",
  //         id: item._id,
  //         name: item.name,
  //         price: finalPrice,
  //         qty: qty,
  //         size: size,
  //       });
  //       return;
  //     }
  //     return;
  //   }
  //   await dispatch({
  //     type: "ADD",
  //     id: item._id,
  //     name: item.name,
  //     price: finalPrice,
  //     qty: qty,
  //     size: size,
  //   });
  // };

  const handleAddToCart = async () => {
    // Find the existing item in the cart
    const existingItem = data.find(
      (cartItem) => cartItem.id === item._id && cartItem.size === size
    );
  
    if (existingItem) {
      // If the item with the same size exists, update it
      await dispatch({
        type: "UPDATE",
        id: item._id,
        qty,
        price: finalPrice,
        size,
      });
    } else {
      // Otherwise, add a new item
      await dispatch({
        type: "ADD",
        id: item._id,
        name: item.name,
        price: finalPrice,
        qty,
        size,
      });
    }
  };

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <ChakraCard maxW="sm" bg={"#C75B7A"}>
      <CardBody>
        <Image
          src={item?.img}
          width={"344px"}
          height={"230px"}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3" color={COLORS.white}>
          <Heading size="md">{item?.name}</Heading>
          <Text>{item?.description}</Text>
          <Flex gap={4}>
            <Select
              placeholder="Select option"
              onChange={(e) => {
                setQty(e.target.value);
              }}
              value={qty}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </Select>
            <Select
              placeholder="Select option"
              onChange={(e) => {
                setSize(e.target.value);
              }}
              ref={priceRef}
              value={size}
            >
              {priceOptions?.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </Select>
          </Flex>
          <Flex justifyContent={"space-between"} mt={4}>
          <Text color={COLORS.white} fontSize="2xl" fontWeight={"bold"}>
            ₹{finalPrice}/-
          </Text>
          <Button colorScheme={"blue"} onClick={handleAddToCart}>
            <Box as={FaCartArrowDown} mr={2} />
            Add to cart
          </Button>
          </Flex>
        </Stack>
      </CardBody>
      {/* <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue" onClick={handleAddToCart}>
            <Box as={FaCartArrowDown} mr={2} />
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter> */}
    </ChakraCard>
  );
};

export default Card;
