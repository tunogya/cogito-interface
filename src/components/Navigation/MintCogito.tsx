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
  Text,
  Textarea,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import {Trans} from "@lingui/macro"
import {useCurrentUser} from "../../hooks/useCurrentUser"
import {useRef, useState} from "react"
import {AiFillFileAdd} from "react-icons/all"
import FileItem from "./FileItem"
import {PROCESSING} from "../../constants/status"
import parseIpfsCid from "../../utils/parseIpfsCid"
import checkMedia from "../../utils/checkMedia"
import useCogitoMinter from "../../hooks/useCogitoMinter"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import {SmallAddIcon} from "@chakra-ui/icons"
import {useRecoilState} from "recoil";
import {filesAtom} from "../../state/Files";
import useWeb3Storage from "../../hooks/useWeb3Storage";

const MintCogito = () => {
  const {width} = useWindowDimensions()

  const {isOpen, onOpen, onClose} = useDisclosure()
  const [text, setText] = useState("")
  const [files, setFiles] = useRecoilState(filesAtom)
  const {user} = useCurrentUser()
  const filesUpload = useRef(null)
  const web3storage = useWeb3Storage()
  const initialFocusRef = useRef(null)
  const minter = useCogitoMinter()
  const handleReset = () => {
    setText("")
  }
  const getMetaData = () => {
    let metadata = {}
    if (user.loggedIn) {
      metadata = {...metadata, author: user.addr}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    metadata = {...metadata, create_at: Date.now()}
    if (text !== "") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      metadata = {...metadata, text: text}
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
        <IconButton aria-label={"mint"} onClick={onOpen} icon={<SmallAddIcon/>} w={12} h={12}/>
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
        <ModalOverlay/>
        <ModalContent h={96}>
          <ModalHeader>
            <Heading fontSize={"xl"}>
              <Trans>Cogito ergo sum</Trans>
            </Heading>
          </ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Textarea
              placeholder="What's happening?"
              resize={"none"}
              variant="filled"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <Wrap pt={2}>
              {files.map((f, index) => (
                <WrapItem key={index}>
                  <FileItem name={f.name}/>
                </WrapItem>
              ))}
            </Wrap>
          </ModalBody>
          <ModalFooter>
            <input
              type={"file"}
              ref={filesUpload}
              style={{display: "none"}}
              onChange={e => {
                if (!e.target.files) {
                  return
                }
                for (let i = 0; i < e.target.files.length; i++) {
                  const f = e.target.files[i]
                  // @ts-ignore
                  setFiles([...files, { name: f.name, content: f as File, size: f.size, type: f.type }])
                }
              }}
            />

            <IconButton
              aria-label={"files"}
              icon={<AiFillFileAdd/>}
              size={"md"}
              variant={"ghost"}
              onClick={() => {
                // @ts-ignore
                filesUpload.current.click()
              }}
            />
            <Spacer/>
            <Button
              fontWeight={"bold"}
              disabled={text === "" && files === []}
              onClick={async () => {
                // JSON.stringify(getMetaData())

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
