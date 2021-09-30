import {Box, Divider, Stack, Text} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
import {FC, ReactNode} from "react";

interface ContentProps {
  label: string
  children: ReactNode
  hasDivider?: boolean
}

export const Content: FC<ContentProps> = ({...props}) => {
  return (
    <Box w={"100%"} h={"100%"}>
      <Text fontWeight={"bold"} fontSize={"xl"} p={"8px 16px"}>
        <Trans>{props.label}</Trans>
      </Text>
      {props.hasDivider && (
        <Divider/>
      )}
      <Stack>
        { props.children }
      </Stack>
    </Box>
  )
}

export default Content