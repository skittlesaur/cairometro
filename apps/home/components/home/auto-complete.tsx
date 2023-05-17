import { useEffect,  useState } from 'react'

import * as Menubar from '@radix-ui/react-menubar'
import Fuse from 'fuse.js'
import { useTranslation } from 'next-i18next'

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
    
  return suggestions
}

const AutoComplete = ()=>{
  const { t } = useTranslation('home')
  const [station, setStation] = useState('')
  const handleStation = (Event: React.FormEvent<HTMLInputElement>)=>{
    setStation(Event.currentTarget.value)

  }
  const filteredSearch = useFuse(station, line1StationsData)
  console.log(filteredSearch)
  

  return (
    <Menubar.Root className="MenubarRoot w-full">
      <Menubar.Menu>
        <Menubar.Trigger
          asChild
          className="MenubarTrigger"
        >
          <div>
            <input
              placeholder={t('hero.from.placeholder') as string}
              className="font-normal text-sm leading-5 text-neutral-500 w-full"
              onChange={handleStation}
            />
          </div> 


        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)] will-change-[transform,opacity]"
            align="start"
            sideOffset={5}
            alignOffset={-3}
          >
            <Menubar.Item className="group text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none">
              item 1
            </Menubar.Item>
            <Menubar.Item className="group text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none">
              item 2
            </Menubar.Item>
            <Menubar.Item className="group text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none">
              item 3
            </Menubar.Item>

          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>

  )
}
export default AutoComplete