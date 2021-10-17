import checkMedia from "./checkMedia";

describe('check media', ()=>{
  it('audio/aac', () => {
    expect(checkMedia('audio/aac')).toEqual(true)
  })
  it('application/x-abiword', () => {
    expect(checkMedia('application/x-abiword')).toEqual(false)
  })
  it('video/x-msvideo', () => {
    expect(checkMedia('video/x-msvideo')).toEqual(true)
  })
  it('image/bmp', () => {
    expect(checkMedia('image/bmp')).toEqual(true)
  })
  it('undefined', () => {
    expect(checkMedia('')).toEqual(false)
  })


})