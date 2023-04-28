import rateLimit from 'express-rate-limit'

/**
 * Limit the rate of requests to a given endpoint
 * @param maxRate The maximum number of requests allowed in the given time window
 * @param minutes The time window in minutes
 */
export const limitRate = (maxRate: number, minutes: number) => rateLimit({
  windowMs: minutes * 60 * 1000,
  max: maxRate,
  standardHeaders: true,
  legacyHeaders: false,
  message: `Too many requests from this IP, please try again in ${minutes} minutes`,
})