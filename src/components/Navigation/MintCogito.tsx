import {
  Button,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Textarea,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { Trans } from "@lingui/macro"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useRef, useState } from "react"
import { useNFTStorage } from "../../hooks/useNFTStorage"
import { AiFillFileAdd } from "react-icons/all"
import FIleItem from "./FIleItem"
import { Attachment } from "../../constants/interfaces"
import { PROCESSING } from "../../constants/status"
import parseIpfsCid from "../../utils/parseIpfsCid"
import checkMedia from "../../utils/checkMedia"
import useCogitoMinter from "../../hooks/useCogitoMinter"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import { SmallAddIcon } from "@chakra-ui/icons"

const MintCogito = () => {
  const { width } = useWindowDimensions()

  // mint Modal status
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [text, setText] = useState("")
  const [files, setFiles] = useState([])
  // get user info
  const { user } = useCurrentUser()
  // content input ref
  const filesUpload = useRef(null)
  // upload nft storage hooks
  const storage = useNFTStorage()
  const initialFocusRef = useRef(null)
  const minter = useCogitoMinter()
  // delete the attachment
  const handleDelete = (name: string) => {
    // @ts-ignore
    setFiles(files.filter(attachment => attachment.fileName !== name))
  }
  const handleUpdate = (fileName: string, newAttachment: Attachment) => {
    // @ts-ignore
    setFiles(files.map(attachment => (attachment.fileName === fileName ? newAttachment : attachment)))
  }
  const handleReset = () => {
    setText("")
    setFiles([])
  }
  const getMetaData = () => {
    let metadata = {}
    if (user.loggedIn) {
      metadata = { ...metadata, author: user.addr }
    }
    if (files.length > 0) {
      let attachment = {}
      // @ts-ignore
      const m = files.filter(file => checkMedia(file.type))
      // @ts-ignore
      const f = files.filter(file => !checkMedia(file.type))
      if (m.length > 0) {
        attachment = {
          ...attachment,
          media: m.map(file => {
            // @ts-ignore
            return { name: file.fileName, uri: file.uri }
          }),
        }
      }
      if (f.length > 0) {
        attachment = {
          ...attachment,
          files: f.map(file => {
            // @ts-ignore
            return { name: file.fileName, uri: file.uri }
          }),
        }
      }
      metadata = {
        ...metadata,
        attachment,
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    metadata = { ...metadata, create_at: Date.now() }
    if (text !== "") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      metadata = { ...metadata, text: text }
    }
    console.log(metadata)
    return metadata
  }

  if (!user.loggedIn) {
    return null
  }

  return (
    <>
      {width >= 1200 ? (
        <Button onClick={onOpen} fontWeight={"bold"} isFullWidth>
          <Trans>+ Cogito</Trans>
        </Button>
      ) : (
        <IconButton aria-label={"mint"} onClick={onOpen} icon={<SmallAddIcon />} w={12} h={12}/>
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={false}
        scrollBehavior={"inside"}
        initialFocusRef={initialFocusRef}
        size={width >= 640 ? "xl" : "xs"}
      >
        <ModalOverlay />
        <ModalContent h={96}>
          <ModalHeader>
            <Heading fontSize={"xl"}>
              <Trans>Cogito ergo sum</Trans>
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="What's happening?"
              resize={"none"}
              variant="filled"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <Wrap pt={2}>
              {files.map((attachment, index) => (
                <WrapItem key={index}>
                  <FIleItem attachment={attachment} onDelete={handleDelete} onUpdate={handleUpdate} />
                </WrapItem>
              ))}
            </Wrap>
          </ModalBody>
          <ModalFooter>
            <input
              type={"file"}
              ref={filesUpload}
              style={{ display: "none" }}
              onChange={e => {
                if (!e.target.files) {
                  return
                }
                for (let i = 0; i < e.target.files.length; i++) {
                  const f = e.target.files[i]
                  setFiles([
                    // @ts-ignore
                    ...files,
                    // @ts-ignore
                    { fileName: f.name, content: f as File, create_at: f.lastModified, size: f.size, type: f.type },
                  ])
                }
              }}
            />

            <IconButton
              aria-label={"files"}
              icon={<AiFillFileAdd />}
              size={"md"}
              variant={"ghost"}
              onClick={() => {
                // @ts-ignore
                filesUpload.current.click()
              }}
            />
            <Spacer />
            <Button
              fontWeight={"bold"}
              disabled={text === "" && files.length === 0}
              isLoading={storage?.state === PROCESSING || minter.status === PROCESSING}
              onClick={async () => {
                const cid = await storage?.storeBlob(JSON.stringify(getMetaData())).then(cid => cid)
                if (user.addr) {
                  await minter.mint(parseIpfsCid(cid)).then(res => {
                    console.log(res)
                  })
                  handleReset()
                }
              }}
            >
              Mint
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MintCogito
