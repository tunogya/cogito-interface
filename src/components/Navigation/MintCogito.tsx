import {
  Button, Heading, IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Spacer, Textarea, useDisclosure, Wrap, WrapItem,
} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
import {useCurrentUser} from "../../hooks/useCurrentUser"
import {useRef, useState} from "react"
import {useNFTStorage} from "../../hooks/useNFTStorage";
import {AiFillFileAdd} from "react-icons/all";
import FileListItem from "./FileListItem";

const MintCogito = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [content, setContent] = useState("")
  const [fileList, setFileList] = useState([])
  const {user} = useCurrentUser()
  const filesUpload = useRef(null)
  const storage = useNFTStorage()

  const handleDelete = (name: string) => {
    // @ts-ignore
    setFileList(fileList.filter(file => file.name !== name))
  }

  return (
    <>
      <Button onClick={onOpen} fontWeight={"bold"} disabled={!user.loggedIn}>
        <Trans>+ Cogito</Trans>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false} scrollBehavior={"inside"} size={"lg"}>
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
            <Wrap pt={2}>
              {fileList.map((file, index) => (
                <WrapItem key={index}>
                  <FileListItem file={file} onDelete={handleDelete}/>
                </WrapItem>
              ))}
            </Wrap>

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

            <IconButton aria-label={"files"} icon={<AiFillFileAdd/>} size={"md"} variant={"ghost"}
                        onClick={() => {
                          // @ts-ignore
                          filesUpload.current.click()
                        }}/>

            <Spacer/>
            <Button fontWeight={"bold"} onClick={() => storage?.storeBlob(content) }>Mint</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MintCogito