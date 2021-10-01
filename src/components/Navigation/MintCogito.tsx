import {
  Button, Heading, IconButton,
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
  BiFileBlank,
  HiFilm,
  HiLocationMarker,
  HiOutlinePhotograph,
} from "react-icons/all";
import {useCurrentUser} from "../../hooks/useCurrentUser";

const MintCogito = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {user} = useCurrentUser()

  return (
    <>
      <Button onClick={onOpen} fontWeight={"bold"} disabled={!user.loggedIn}>
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