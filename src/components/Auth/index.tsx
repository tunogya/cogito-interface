import {Button} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
import {useCurrentUser} from "../../hooks/useCurrentUser";

const Auth = () => {
  const { user, logIn } = useCurrentUser()

  return (
    <>
      { user.loggedIn ? (
        <Button borderRadius={"3xl"}>
          <Trans>{ user.addr }</Trans>
        </Button>
      ) : (
        <Button onClick={logIn}>
          <Trans>Log in</Trans>
        </Button>
      ) }
    </>
  )
}

export default Auth