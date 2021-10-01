import {
  Button, Divider, Heading, IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Spacer, Textarea, useDisclosure
} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
import {
  AiOutlineFile,
  BiFileBlank,
  HiFilm,
  HiLocationMarker,
  HiOutlinePhotograph,
  HiPaperClip,
  RiUserSmileLine
} from "react-icons/all";

const MintCogito = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <>
      <Button onClick={onOpen} fontWeight={"bold"}>
        <Trans>+ Cogito</Trans>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>
            <Heading fontSize={"xl"}>
              <Trans>Cogito ergo sum</Trans>
            </Heading>
          </ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Textarea placeholder="What's happening?" resize={"none"} variant="filled"/>
          </ModalBody>
          <ModalFooter>
            <IconButton aria-label={"photo"} icon={<HiOutlinePhotograph/>} size={"md"} variant={"ghost"}/>
            <IconButton aria-label={"film"} icon={<HiFilm/>} size={"md"} variant={"ghost"}/>
            <IconButton aria-label={"file"} icon={<BiFileBlank/>} size={"md"} variant={"ghost"}/>
            <IconButton aria-label={"emoji"} icon={<HiLocationMarker/>} size={"md"} variant={"ghost"}/>
            <Spacer/>
            <Button fontWeight={"bold"}>Mint</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MintCogito