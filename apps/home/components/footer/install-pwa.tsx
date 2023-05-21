import { useEffect, useState } from 'react'

import PwaLogo from '@/icons/logo-pwa.svg'

interface BeforeInstallPromptEvent extends Event {
  prompt: ()=> void
}

const InstallPwa = () => {
  const [defferedPrompt, setDefferedPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      setDefferedPrompt(e as BeforeInstallPromptEvent)
    })
  }, [])

  const handleClick = () => {
    if (defferedPrompt) {
      defferedPrompt.prompt()
    }
  }

  return (
    <button
      className="text-neutral-100 bg-neutral-800 hover:bg-neutral-700 hover:border-neutral-500 border border-neutral-700 rounded flex items-center gap-2 px-3 py-1"
      onClick={handleClick}
    >
      <PwaLogo className="fill-neutral-100 w-9 h-9" />
      <div className="grow flex flex-col">
        <p className="text-[0.65rem] tracking-wider">
          Download
        </p>
        <p className="text-sm font-medium tracking-widest">
          Application
        </p>
      </div>
    </button>
  )
}

export default InstallPwa