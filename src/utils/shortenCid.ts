const shortenCid = (address: string, chars = 6) => {
  if (!address) { return }
  return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`
}

export default shortenCid