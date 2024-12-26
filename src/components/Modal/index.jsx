import React from "react";
import {
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  Modal,
  ModalContent,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { TbArrowLeft } from "react-icons/tb";

const ModalComponent = ({
  onClose = () => {},
  modalOpen,
  modalTitle,
  modalPadding,
  size,
  children,
  isLeftArrow,
  goBack,
  minHeight,
  scrollBehavior,
  bodyPadding,
  modalsubTitle,
  closeOnOverlayClick = true,
  hideCloseButton = false,
}) => {
  return (
    <Modal
      isOpen={modalOpen}
      onClose={onClose}
      size={size ? size : "md"}
      isCentered
      scrollBehavior={scrollBehavior ? "inside" : "unset"}
      closeOnOverlayClick={closeOnOverlayClick}
    >
      <ModalOverlay />
      <ModalContent
        minHeight={minHeight ? minHeight : "unset"}
        // bg={bodyPadding ? "unset" : "white"}
        backgroundColor={"#D9ABAB"}
      >
        <Flex
          display={bodyPadding ? "none" : "flex"}
          justify={isLeftArrow ? "space-between" : "center"}
          align={"center"}
          my={2}
          mx={2}
        >
          {isLeftArrow && (
            <Icon
              as={TbArrowLeft}
              width="20px"
              mt="5px"
              ml={{ sm: "5px", lg: "30px" }}
              mr={{ sm: "5px", lg: "30px" }}
              height="20px"
              color="inherit"
              fontWeight="700"
              fontSize="sm"
              cursor="pointer"
              onClick={goBack}
            />
          )}
          <Flex direction={"column"} alignItems={"center"}>
            <Text
              color="#1B2559"
              fontSize="20px"
              fontWeight={700}
              lineHeight={"30px"}
              textAlign={"center"}
              p={modalPadding}
            >
              {modalTitle}
            </Text>
            {modalsubTitle && (
              <Text color="#1B2559" fontSize="15px" lineHeight={"30px"}>
                {modalsubTitle}
              </Text>
            )}
          </Flex>
          {!bodyPadding && !hideCloseButton && (
            <ModalCloseButton
              position={isLeftArrow ? "relative" : "absolute"}
              top={isLeftArrow ? "0" : 2}
              right={isLeftArrow ? "0" : 3}
            />
          )}
        </Flex>
        {bodyPadding && !hideCloseButton && (
          <ModalCloseButton
            position={"absolute"}
            top={"-36px"}
            right={1}
            background="gray.800"
            color={"white"}
          />
        )}
        <ModalBody p={bodyPadding ? bodyPadding : 6}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
