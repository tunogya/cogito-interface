export function fmtFlow(balance: string | null) {
  if (balance == null ) return null
  return String(Number(balance) / 100000000)
}
