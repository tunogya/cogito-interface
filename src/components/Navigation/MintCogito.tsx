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
import {useCurrentUser} from "../../hooks/useCurrentUser"
import {useEffect, useRef, useState} from "react"
import {useNFTStorage} from "../../hooks/useNFTStorage";
import {AiFillFileAdd} from "react-icons/all";
import AttachmentItem from "./AttachmentItem";
import {Attachment} from "../../constants/interfaces";

const MintCogito = () => {
  // mint Modal status
  const {isOpen, onOpen, onClose} = useDisclosure()

  // metadata name
  const [name, setName] = useState("")

  // metadata description
  const [description, setDescription] = useState("")

  // metadata properties attachment
  const [attachmentList, setAttachmentList] = useState([])

  // get user info
  const {user} = useCurrentUser()

  // content input ref
  const filesUpload = useRef(null)

  // upload nft storage hooks
  const storage = useNFTStorage()

  const [nft, setNft] = useState({})

  const initialFocusRef = useRef(null)

  // delete the attachment
  const handleDelete = (name: string) => {
    // @ts-ignore
    setAttachmentList(attachmentList.filter(attachment => attachment.fileName !== name))
  }

  const handleUpdate = (fileName: string, newAttachment: Attachment) => {
    // @ts-ignore
    setAttachmentList(attachmentList.map((attachment) => attachment.fileName === fileName ? newAttachment : attachment))
  }

  useEffect(() => {
    setNft({
      name: name,
      description: description,
      image: "",
      properties: {
        attachment: attachmentList.map((attachment) => {
          // @ts-ignore
          return {fileName: attachment.fileName, cid: attachment.cid}
        }),
        copyright: user.addr,
        createdTimestamp: Date.now()
      }
    })
  }, [attachmentList, setAttachmentList, description, name, user.addr])

  return (
    <>
      <Button onClick={onOpen} fontWeight={"bold"}>
        <Trans>+ Cogito</Trans>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false} scrollBehavior={"inside"}
             initialFocusRef={initialFocusRef}
             size={"lg"}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>
            <Heading fontSize={"xl"}>
              <Trans>Cogito ergo sum</Trans>
            </Heading>
          </ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Input variant="filled" mb={2} placeholder={"Name"} ref={initialFocusRef}
                   onChange={(e) => setName(e.target.value)}/>
            <Textarea placeholder="What's happening?" resize={"none"} variant="filled"
                      onChange={(e) => setDescription(e.target.value)}/>
            <Wrap pt={2}>
              {attachmentList.map((attachment, index) => (
                <WrapItem key={index}>
                  <AttachmentItem attachment={attachment} onDelete={handleDelete} onUpdate={handleUpdate}/>
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
                setAttachmentList([...attachmentList, {fileName: e.target.files[i].name, content: e.target.files[i] as File, cid: ""}])
              }
            }}/>

            <IconButton aria-label={"files"} icon={<AiFillFileAdd/>} size={"md"} variant={"ghost"}
                        onClick={() => {
                          // @ts-ignore
                          filesUpload.current.click()
                        }}/>
            <Spacer/>
            <Button fontWeight={"bold"}
                    onClick={() => {
                      console.log(JSON.stringify(nft))
                      storage?.storeBlob(JSON.stringify(nft))
                    }}>Mint</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MintCogito