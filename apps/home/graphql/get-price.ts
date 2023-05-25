import { Variables } from 'graphql-request'

import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

interface PriceVariables extends Variables {
  from: string
  to: string
  passengers: {
    seniors: number
    adults: number
    children: number
  }
}

const GET_PRICE_QUERY = /* GraphQL */ `
  query getPrice($from: String!, $to: String!, $passengers: passengersInputType!) {
    getPrice(from: $from, to: $to, passengers: $passengers)
  }
`

const useGetPrice = (variables: PriceVariables) => {
  const result = useSWR(
    [GET_PRICE_QUERY, variables],
    (queryStr: string) => graphqlFetcher(queryStr, variables),
  )

  return result
}

export default useGetPrice