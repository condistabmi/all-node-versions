import isPlainObj from 'is-plain-obj'

// Normalize options and assign default values
export const getOpts = (opts = {}) => {
  if (!isPlainObj(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }

  const { fetch: fetchOpt, ...fetchNodeOpts } = opts

  if (fetchOpt !== undefined && typeof fetchOpt !== 'boolean') {
    throw new TypeError(`Option "fetch" must be a boolean: ${fetchOpt}`)
  }

  return { fetchOpt, fetchNodeOpts }
}
