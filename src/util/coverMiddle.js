module.exports = (v) => {
  let l = v.length
  let cover = l / 2 + l % 2
  let start = l / 4
  return `${v.substring(0, start)}******${v.substring(start+cover, v.length)}`
}