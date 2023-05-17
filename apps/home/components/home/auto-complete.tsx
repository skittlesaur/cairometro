import { useEffect,  useState } from 'react'

import Fuse from 'fuse.js'
import Turnstone from 'turnstone'

import { line1StationsData } from './stations'

const options = {
  includeScore: true,
  isCaseSensitive: false,
  shouldSort: true,
  minMatchCharLength: 1,
  threshold: 0.5,
  keys: [
    'name', 'name_ar',    
  ],
}
  
const useFuse = (searchTerm: string, stations: {name: string, name_ar: string}[]) => {
  
  const [suggestions, setSuggestions] = useState<{name: string, name_ar: string}[]>([])
  useEffect(() => {
    const fuse = new Fuse(stations, options)
    const items = fuse.search(searchTerm)
    console.log('search', items)
    setSuggestions(items)
  }, [searchTerm])
  
  console.log(suggestions)
  return suggestions
}
  