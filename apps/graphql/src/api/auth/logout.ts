import { Request, Response } from 'express'

const logout = async (req: Request, res: Response) => {
  try {
    const accessTokenCookieDomain = process.env.ACCESS_TOKEN_COOKIE ?? ''

    res.clearCookie('access', {
      domain: accessTokenCookieDomain,
    })

    return res.status(200).json({
      success: true,
    })
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}

export default logout