import { Button } from '@/components/button'
import LogoGoogle from '@/icons/logo-google.svg'

import { useTranslation } from 'next-i18next'

const ContinueWithGoogle = () => {
  const { t } = useTranslation('common')

  return (
    <Button
      className="w-full flex items-center justify-center gap-2 text-neutral-500 hover:text-neutral-600"
      variant="outline"
      size="lg"
      onClick={() => {
        // @TODO: Implement Google Sign In
        alert('Google Sign In')
      }}
    >
      <LogoGoogle className="w-6 h-6" />
      <span className="text-sm font-medium">
        {t('components.continueWithGoogle.text')}
      </span>
    </Button>
  )
}

export default ContinueWithGoogle