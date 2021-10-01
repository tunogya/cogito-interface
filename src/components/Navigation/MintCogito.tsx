import {
  Button, Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Stack, useDisclosure
} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";

const MintCogito = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen} fontWeight={"bold"}>
        <Trans>+ Cogito</Trans>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent h={"600px"}>
          <ModalHeader>
            <Heading fontSize={"2xl"}>
              <Trans>Mint Cogito</Trans>
            </Heading>
          </ModalHeader>
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