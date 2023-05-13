import { useMemo } from 'react'

import { Button } from '@/components/button'

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { useTranslation } from 'next-i18next'
import * as process from 'process'

import { Separator } from '../separator'
import Passengers from '../passengers'

const Hero = () => {
  const { t } = useTranslation('home')
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  })

  const center = useMemo(() => ({ lat: 30.0444, lng: 31.2357 }), [])

  
  return (
    <div className="w-screen -mx-4 md:mx-[calc((100vw-100%)/-2+8px)]">
      <div className="relative">
        {isLoaded ? (
          <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName="map-container"
            mapContainerStyle={{ position: 'relative', width: '100vw', height: '80vh' }}
            options={{ mapId: process.env.NEXT_PUBLIC_MAP_ID }}
          >
            <Marker position={center} />
          </GoogleMap>
        ) : (
          <div className="w-full h-[80vh] bg-neutral-200 animate-pulse" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none" />
      </div>
      <div className="-translate-y-1/2 -mb-28 md:-mb-10 gap-4 md:gap-8 flex md:flex-row justify-between flex-col items-center border border-neutral-300 rounded-lg shadow-xl bg-white px-5 py-4 md:px-9 md:py-7 mx-4 md:mx-auto md:w-full max-w-[1300px]">
        <div className="flex flex-col items-start w-full">
          <label className="text-base font-medium text-base-black block">
            {t('hero.from.title')}
          </label>
          <input
            placeholder={t('hero.from.placeholder') as string}
            className="font-normal text-sm leading-5 text-neutral-500"
          />
        </div>
        <Separator
          vertical
          className="hidden md:block w-[1px] h-10 bg-neutral-200"
        />
        <div className="flex flex-col items-start w-full">
          <label className="text-base font-medium text-base-black block">
            {t('hero.to.title')}
          </label>
          <input
            placeholder={t('hero.to.placeholder') as string}
            className="font-normal text-sm leading-5 text-neutral-500"
          />
        </div>
        <Separator
          vertical
          className="hidden md:block w-[1px] h-10 bg-neutral-200"
        />
        <div className="flex flex-col items-start w-full">
          <label className="text-base font-medium text-base-black block">
            {t('hero.travelTime.title')}
          </label>
          <input
            placeholder={t('hero.travelTime.placeholder') as string}
            className="font-normal text-sm leading-5 text-neutral-500"
          />
        </div>
        <Separator
          vertical
          className="hidden md:block w-[1px] h-10 bg-neutral-200"
        />
        <Passengers />
        <div className="flex flex-col items-start w-full">
          <Button
            size={'lg'}
            variant={'primary'}
            className="min-w-[14em] w-full"
          >
            {t('hero.findARide')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero