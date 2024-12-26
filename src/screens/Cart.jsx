import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useCheckout } from "../service/Checkout";

const Cart = () => {
  const { mutateAsync: checkout } = useCheckout();

  const cartItems = [
    { id: 1, name: "Laptop", price: 799, quantity: 1 },
    { id: 2, name: "Headphones", price: 199, quantity: 2 },
    { id: 3, name: "Keyboard", price: 99, quantity: 1 },
  ];

  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        minH={32}
        fontSize={"xl"}
      >
        The Cart is Empty!
      </Flex>
    );
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckout = async () => {
    try {
      let userEmail = localStorage.getItem("userEmail");
      let body = {
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      };
      const response = await checkout(body);
      console.log("response", response);
      if (response?.status === 200) {
        dispatch({ type: "DROP" });
      }
    } catch (error) {
      console.error("error checking out:", error);
    }
  };

  return (
    <TableContainer px={10} py={5}>
      <Table
        // variant="striped"
        // colorScheme="blue"
        
      >
        <Thead>
          <Tr>
            <Th>Index</Th>
            <Th>Item Name</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Option</Th>
            {/* <Th>Total</Th> */}
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={item.id}
            bg={index % 2 === 0 ? "#F4D9D0" : "#D9ABAB"}
            >
              <Td>{index + 1}</Td>
              <Td>{item.name}</Td>
              <Td>₹{item.price}</Td>
              <Td>{item.qty}</Td>
              <Td>{item.size}</Td>
              {/* <Td>₹{totalPrice}</Td> */}
              <Td>
                <Flex alignItems={"center"} gap={6}>
                  <FaEdit color="blue" size={"22px"} cursor={"pointer"} />

                  {/* <Button colorScheme="blue" size="sm" mr={2}>
                    Edit
                  </Button> */}
                  <MdOutlineDeleteForever
                    color={"red"}
                    size={"28px"}
                    cursor={"pointer"}
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  />
                </Flex>

                {/* <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => {
                    dispatch({ type: "REMOVE", index: index });
                  }}
                >
                  Remove
                </Button> */}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex fontSize={"xl"} gap={2} mt={2} justifyContent={"space-between"}>
        <Flex>
          <Text>Total price:</Text>
          <Text fontWeight={600}>₹{totalPrice}</Text>
        </Flex>
        <Button
          size="md"
          rounded="md"
          color={"white"}
          bg={"#921A40"}
          _hover={{
            bg: "blue.600",
          }}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </Flex>
    </TableContainer>
  );
};

export default Cart;
