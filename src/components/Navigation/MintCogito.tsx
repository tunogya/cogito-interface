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
import {useCurrentUser} from "../../hooks/useCurrentUser"
import {useEffect, useRef, useState} from "react"
import {useNFTStorage} from "../../hooks/useNFTStorage";
import {BiFileBlank} from "react-icons/all";

const MintCogito = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [content, setContent] = useState("")
  const [fileList, setFileList] = useState<object>()
  const {user} = useCurrentUser()
  const storage = useNFTStorage()
  const filesUpload = useRef(null)

  useEffect(() => {
    console.log(fileList)
  }, [fileList, setFileList])

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
            <Textarea placeholder="What's happening?" resize={"none"} variant="filled"
                      onChange={(e) => setContent(e.target.value)}/>
          </ModalBody>
          <ModalFooter>
            <input type={"file"} ref={filesUpload} style={{display: "none"}} onChange={(e) => {
              if (!e.target.files) {
                return
              }
              setFileList(e.target.files)
            }}/>

            <IconButton aria-label={"files"} icon={<BiFileBlank/>} size={"md"} variant={"ghost"}
                        onClick={() => {
                          // @ts-ignore
                          filesUpload.current.click()
                        }}/>

            <Spacer/>
            <Button fontWeight={"bold"} onClick={() => storage?.storeCogito({
              name: Date.now().toString(),
              description: content,
              image: "Hello",
            })}>Mint</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MintCogito