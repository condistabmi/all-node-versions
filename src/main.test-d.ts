import allNodeVersions, {
  Options,
  NodeVersions,
  MajorNodeVersions,
  SemverVersion,
} from 'all-node-versions'
import {
  expectType,
  expectError,
  expectAssignable,
  expectNotAssignable,
} from 'tsd'

const nodeVersions = await allNodeVersions()

allNodeVersions({})
expectAssignable<Options>({})
expectError(allNodeVersions(true))

allNodeVersions({ mirror: 'http://example.com' })
expectAssignable<Options>({ mirror: 'http://example.com' })
expectError(allNodeVersions({ mirror: true }))

allNodeVersions({ fetch: true })
allNodeVersions({ fetch: undefined })
expectAssignable<Options>({ fetch: true })
expectError(allNodeVersions({ fetch: 'true' }))

expectType<NodeVersions>(nodeVersions)
const {
  versions: [nodeVersion],
  majors: [majorNodeVersion],
} = nodeVersions

expectAssignable<string>(nodeVersion)

expectType<MajorNodeVersions>(majorNodeVersion)
const { major, latest, lts } = majorNodeVersion
expectType<number>(major)
expectAssignable<string>(latest)
expectType<string | undefined>(lts)

expectAssignable<SemverVersion>('1.2.3')
expectAssignable<SemverVersion>('0.0.1')
expectAssignable<SemverVersion>('10.10.10')
expectAssignable<SemverVersion>('1.2.3-beta')
expectNotAssignable<SemverVersion>('1.2.a')
expectNotAssignable<SemverVersion>('1.2')
expectNotAssignable<SemverVersion>('1')
