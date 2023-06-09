import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const USER_QUERY = /* GraphQL */ `
{
  recommendations{
    from {
      id
      name
      name_ar
    }
    to {
      id
      name
      name_ar
    }
    noOfStationsOnPath
    price
    schedule{
      departureTime
      arrivalTime
    }
  }
}
`

const useRecommendations = () => {
  const result = useSWR(
    [USER_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return result
}

export default useRecommendations