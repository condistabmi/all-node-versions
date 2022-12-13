import { pathExists } from 'path-exists'

import {
  getCacheFile,
  getCacheFileContent,
  setCacheFileContent,
} from './file.js'

// We cache the HTTP request. It only lasts for one hour (except offline)
// to make sure we include new Node versions made available every week.
// We also cache it in-memory so it's performed only once per process.
// If the `fetch` option is:
//   - `undefined`: we use the cache
//   - `false`: we use the cache even if it is old
//   - `true`: we do not use the cache
// In all three cases, we update the cache on any successful HTTP request.
export const readCachedVersions = async (fetchOpt) => {
  if (fetchOpt === true) {
    return
  }

  const cacheFile = await getCacheFile()

  if (!(await pathExists(cacheFile))) {
    return
  }

  const { versionsInfo, age } = await getCacheFileContent(cacheFile)

  if (isOldCache(age, fetchOpt)) {
    return
  }

  return versionsInfo
}

const isOldCache = (age, fetchOpt) => age > MAX_AGE_MS && fetchOpt !== false

// One hour
const MAX_AGE_MS = 36e5

// Persist the cached versions
export const writeCachedVersions = async (versionsInfo) => {
  const cacheFile = await getCacheFile()
  await setCacheFileContent(cacheFile, versionsInfo)
}
