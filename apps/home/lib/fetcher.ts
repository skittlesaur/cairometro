import axios from 'axios'
import Cookies from 'js-cookie'

const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL

const fetcher = (path: string) => {
  const isPathFullURL = path.startsWith('http')
  const isPathRelativeToDefault = path.startsWith('/')
  const url = isPathFullURL ? path : `${DEFAULT_API_URL}${isPathRelativeToDefault ? '' : '/'}${path}`

  const access = Cookies.get('access')
  if (access) axios.defaults.headers.common['x-auth-access'] = `Bearer ${access}`

  return (
    axios
      .get(url, {})
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data
      })
  )
}

export default fetcher
