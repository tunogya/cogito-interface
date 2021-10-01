import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Stack, useDisclosure
} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";
import {Trans} from "@lingui/macro";

const MintCogito = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button leftIcon={<SmallAddIcon/>} borderRadius={"3xl"} onClick={onOpen} size={"lg"}>
        <Trans>Cogito</Trans>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent h={"600px"}>
          <ModalHeader>Mint Cogito</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

          </ModalBody>

          <ModalFooter>
            <Stack direction={"row"}>
              <Button variant={"ghost"}>Save</Button>
              <Button>Mint</Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MintCogito