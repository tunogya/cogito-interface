import {Divider, Heading, Stack} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
import {FC, ReactNode} from "react";

interface ContentProps {
  label: string
  children: ReactNode
  hasDivider?: boolean
}

export const Content: FC<ContentProps> = ({...props}) => {
  return (
    <Stack w={"100%"} h={"100%"} spacing={0}>
      <Heading fontWeight={"bold"} fontSize={"xl"} p={4}>
        <Trans>{props.label}</Trans>
      </Heading>
      {props.hasDivider && (
        <Divider/>
      )}
      <Stack>
        { props.children }
      </Stack>
    </Stack>
  )
}

export default Content