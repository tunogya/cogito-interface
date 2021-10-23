const parseIpfsCid = (cid: string | undefined) => {
  if (!cid) {
    return ""
  }
  return "ipfs://" + cid
}

export default parseIpfsCid
