import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useFetchFoodData } from "../service/DisplayFoodData";
import {
  Box,
  Grid,
  Text,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import { ImSearch } from "react-icons/im";
import { COLORS } from "../Constants/colors";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Home = () => {
  const [foodItems, setFoodItems] = useState();
  const [foodCategory, setFoodCategory] = useState();
  const [slider, setSlider] = useState(null);
  const [search, setSearch] = useState("");
  const { mutateAsync: foodData } = useFetchFoodData();

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  const cards = [
    "https://images.unsplash.com/photo-1551782450-17144efb9c50?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const loadData = async () => {
    try {
      const data = await foodData();
      if (data?.status === 200) {
        setFoodItems(data?.data[0]);
        setFoodCategory(data?.data[1]);
      }
    } catch (error) {
      console.error("error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      backgroundColor={COLORS.light2}
      sx={{
        "::-webkit-scrollbar": {
          width: "6px", // Set the scrollbar width
          height: "6px", // Set the scrollbar height
        },
        "::-webkit-scrollbar-thumb": {
          background: "#888", // Scrollbar thumb color
          borderRadius: "4px", // Rounded scrollbar edges
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#555", // Thumb color on hover
        },
        "::-webkit-scrollbar-track": {
          background: "#f1f1f1", // Track color
        },
      }}
    >
      <Box
        position={"relative"}
        height={"750px"}
        width={"full"}
        overflow={"hidden"}
      >
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          colorScheme="messenger"
          borderRadius="full"
          position="absolute"
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          colorScheme="messenger"
          borderRadius="full"
          position="absolute"
          right={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt />
        </IconButton>
        <InputGroup
          position={"absolute"}
          bottom={"20%"}
          left={"30%"}
          width={"40%"}
          zIndex={1}
        >
          <Input
            variant={"filled"}
            placeholder={"Search"}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            _focus={{
              bg: "white",
              border: "none",
            }}
          />
          <InputRightElement>
            <ImSearch />
          </InputRightElement>
        </InputGroup>
        {/* Slider */}
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((url, index) => (
            <Box
              key={index}
              height={"6xl"}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`url(${url})`}
              objectFit={"contain"}
              _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1,
              }}
            />
          ))}
        </Slider>
      </Box>
      <Box>
        {foodCategory?.length > 0 &&
        foodItems?.some((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        ) ? (
          foodCategory.map((data) => {
            // Filter items based on category and search query
            const filteredItems = foodItems?.filter(
              (item) =>
                item?.CategoryName === data?.CategoryName &&
                item.name.toLowerCase().includes(search.toLowerCase())
            );

            // If no items match, skip rendering this category
            if (!filteredItems || filteredItems.length === 0) {
              return null;
            }

            return (
              <Box p={{ base: 6, md: 12 }} key={data?._id}>
                <Text fontSize={"30px"} fontWeight={600}>
                  {data?.CategoryName}
                </Text>
                <hr />
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                    xl: "repeat(4, 1fr)",
                  }}
                  gap={6}
                >
                  {filteredItems.map((item) => (
                    <Box key={item?._id}>
                      <Card
                        item={item}
                        foodItems={foodItems}
                        foodCategory={foodCategory}
                      />
                    </Box>
                  ))}
                </Grid>
              </Box>
            );
          })
        ) : (
          <Flex justifyContent={"center"} alignItems={"center"} height={60}>
            <Text textAlign="center" fontSize="lg" color="gray.600">
              No data to display
            </Text>
          </Flex>
        )}
      </Box>

      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;
