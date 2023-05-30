export const dayStart = new Date(2023, 0, 1, 5, 0, 0)
export const dayEnd = new Date(2023, 0, 1, 23, 0, 0)

export const getScheduleBasedOnGivenTime = (travelDuration: number, time: Date, take: number, page: number) => {
  const waitingPerStationRange = [3, 7]
  const stationDepartureRange = [12, 17]

  const currentTime = new Date(time < dayStart || time > dayEnd ? dayStart : time)
  // pagination offset
  currentTime.setMinutes(currentTime.getMinutes() + travelDuration * page * take)

  const scheduleTimes: {departureTime: Date, arrivalTime: Date}[] = []

  while (scheduleTimes.length < take) {
    const waitingTime = Math.floor(Math.random() * (waitingPerStationRange[1] - waitingPerStationRange[0] + 1) + waitingPerStationRange[0])
    const departureTime = new Date(currentTime.getTime())
    const arrivalTime = new Date(
      departureTime.getTime() + travelDuration * 60 * 1000 + waitingTime * 60 * 1000
    )

    // check if it's the end of the day
    if (departureTime > dayEnd) {
      // reset the time to the start of the day
      currentTime.setHours(dayStart.getHours())
      currentTime.setMinutes(dayStart.getMinutes())
      currentTime.setSeconds(dayStart.getSeconds())
      continue
    }

    currentTime.setHours(departureTime.getHours())
    const minutes = Math.floor(Math.random() * (stationDepartureRange[1] - stationDepartureRange[0] + 1) + stationDepartureRange[0])
    currentTime.setMinutes(departureTime.getMinutes() + minutes)
    currentTime.setSeconds(departureTime.getSeconds())

    // check if the schedule is available
    scheduleTimes.push({ departureTime: departureTime, arrivalTime: arrivalTime })
  }

  return scheduleTimes
}