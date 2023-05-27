import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const ANALYTICS_TOTAL_LINES_AND_STATIONS_QUERY = /* GraphQL */ `
  {
    analyticsActiveLinesAndStations {
      totalLines
      totalStations
    }
  }
`

const useTotalLinesAndStations = () => {
  const result = useSWR(
    [ANALYTICS_TOTAL_LINES_AND_STATIONS_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr)
  )

  return result
}

export default useTotalLinesAndStations