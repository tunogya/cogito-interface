import {
  Button, Heading, IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader, Text,
  ModalOverlay, Spacer, Textarea, useDisclosure, Stack
} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
import {useCurrentUser} from "../../hooks/useCurrentUser"
import {useEffect, useRef, useState} from "react"
import {useNFTStorage} from "../../hooks/useNFTStorage";
import {BiFileBlank} from "react-icons/all";

const MintCogito = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [content, setContent] = useState("")
  const [fileList, setFileList] = useState([])
  const {user} = useCurrentUser()
  const storage = useNFTStorage()
  const filesUpload = useRef(null)

  useEffect(()=>{
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
            { fileList.map(({name, size, type})=> (
              <Stack mt={2}>
                <Button size={"sm"}>{name}</Button>
              </Stack>
            )) }
          </ModalBody>
          <ModalFooter>
            <input type={"file"} ref={filesUpload} multiple style={{display: "none"}} onChange={(e) => {
              if (!e.target.files) {
                return
              }
              const list = [];
              for (let i = 0; i < e.target.files.length; i++) {
                list[i] = e.target.files[i] as File
              }
              // @ts-ignore
              setFileList(list)
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