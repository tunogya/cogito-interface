import {
  Button, Heading, IconButton, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Spacer, Textarea, useDisclosure, Wrap, WrapItem,
} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
// import {useCurrentUser} from "../../hooks/useCurrentUser"
import {useEffect, useRef, useState} from "react"
import {useNFTStorage} from "../../hooks/useNFTStorage";
import {AiFillFileAdd} from "react-icons/all";
import FileListItem from "./FileListItem";

const MintCogito = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [fileList, setFileList] = useState([])
  // const {user} = useCurrentUser()
  const filesUpload = useRef(null)
  const storage = useNFTStorage()

  const handleDelete = (name: string) => {
    // @ts-ignore
    setFileList(fileList.filter(store => store.file.name !== name))
  }

  const handleSetCid = (name: string, newStore: {file: File, cid: string}) => {
    // @ts-ignore
    setFileList(fileList.map((store) => store.file.name === name ? newStore : store))
  }

  useEffect(()=> {
    console.log(fileList)
    const nft = {
      name: name,
      description: description,
      image: "",
      properties: {
        files: fileList.map((store)=> { // @ts-ignore
          return store.cid})
      }
    }

    console.log(nft)

  }, [fileList, setFileList, description, name])

  return (
    <>
      <Button onClick={onOpen} fontWeight={"bold"}>
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
            <Input variant="filled" mb={2} placeholder={"Name"} onChange={(e) => setName(e.target.value)}/>
            <Textarea placeholder="What's happening?" resize={"none"} variant="filled"
                      onChange={(e) => setDescription(e.target.value)}/>
            <Wrap pt={2}>
              {fileList.map((store, index) => (
                <WrapItem key={index}>
                  <FileListItem store={store} onDelete={handleDelete} onSetCid={handleSetCid}/>
                </WrapItem>
              ))}
            </Wrap>

          </ModalBody>
          <ModalFooter>
            <input type={"file"} ref={filesUpload} style={{display: "none"}} onChange={(e) => {
              if (!e.target.files) {
                return
              }
              for (let i = 0; i < e.target.files.length; i++) {
                // @ts-ignore
                setFileList([...fileList, {file: e.target.files[i] as File, cid: ""}])
              }
            }}/>

            <IconButton aria-label={"files"} icon={<AiFillFileAdd/>} size={"md"} variant={"ghost"}
                        onClick={() => {
                          // @ts-ignore
                          filesUpload.current.click()
                        }}/>

            <Spacer/>
            <Button fontWeight={"bold"} onClick={() => storage?.storeBlob(description) }>Mint</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MintCogito