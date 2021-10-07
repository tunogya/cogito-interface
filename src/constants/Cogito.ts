export interface Cogito {
  name: string,
  description: string,
  attachment?: string,
}

export interface Attachment {
  fileName: string
  content: File
  cid: string
}