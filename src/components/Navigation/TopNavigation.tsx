import {Button, Stack} from "@chakra-ui/react";
import {links} from "./index";
import {useHistory} from "react-router-dom";
import {useState} from "react";

export const TopNavigation = () => {
  const history = useHistory()
  const [currentPath, setCurrentPath] = useState(history.location.pathname)

  return (
    <Stack direction={"row"} justifyContent={"flex-end"} p={2} alignItems={"center"}>
      {links.map((link, index) => (
        <Button
          key={index}
          fontWeight={currentPath === link.pathname ? "bold" : "normal"}
          variant={"ghost"}
          size={"sm"}
          onClick={() => {
            history.push(link.pathname)
            setCurrentPath(link.pathname)
          }}
        >
          {link.label}
        </Button>
      ))}
    </Stack>
  )
}