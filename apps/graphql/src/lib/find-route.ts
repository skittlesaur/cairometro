import { GraphQLError } from 'graphql'

import Graph from 'node-dijkstra'

import { Context } from '../context'

const findRoute = async (departure: string, destination: string, ctx: Context) => {
  
  const { prisma } = ctx

  const checkIfExists = await prisma.path.findFirst({
    where: {
      departureId: departure,
      destinationId: destination,
    },
  })

  if (checkIfExists) return checkIfExists

  const departureStation  = await prisma.station.findUnique({
    where: {
      id: departure,
    },
  })

  const destinationStation = await prisma.station.findUnique({
    where: {
      id: destination,
    },
    
  })

  if (!departureStation || !destinationStation) throw new GraphQLError('The stations entered are not valid')
  
  const adjacencyMap: Map<string, Map<string, number>> = new Map()

  const lines =  await prisma.line.findMany({
    include: {
      StationPositionInLine: {
        orderBy: {
          position: 'asc',
        },
      },
    },
  })

  lines.forEach((line) => {

    const stationPositionInLine = line.StationPositionInLine
    
    for (let i = 0; i < stationPositionInLine.length; i++) {
      const currentStation = stationPositionInLine[i].stationId
      const previousStation = i === 0 ? null : stationPositionInLine[i - 1].stationId
      const nextStation = i === stationPositionInLine.length - 1 ? null : stationPositionInLine[i + 1].stationId
    
      if (!adjacencyMap.has(currentStation)) {
        adjacencyMap.set(currentStation, new Map())
      }
    
      if (previousStation) {
        adjacencyMap.get(currentStation)?.set(previousStation, 1)
      }
    
      if (nextStation) {
        adjacencyMap.get(currentStation)?.set(nextStation, 1)
      }
    }
  })

  const route = new Graph(adjacencyMap)
  const path = route?.path(departure, destination, { cost: false }) as string[]

  if (!path) throw new GraphQLError('The path of this journey is not valid')

  const result = await prisma.path.create({
    data: {
      departureId: departure,
      destinationId: destination,
      stationsInPathIds: path,
    },
  })

  return result
}

export default findRoute