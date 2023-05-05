import React from 'react'
import Link from 'next/link'

import { useTranslation } from 'next-i18next'

const Policy = () => {
  const { t } = useTranslation('signup')

  return (
    <p className="text-sm text-neutral-500">
      {(
        t('policy.full')
          .split(' ')
          .map((word, index) => (
            <React.Fragment key={index}>
              {index !== 0 && ' '}
              {word === '{0}' ? (
                <Link
                  className="font-medium text-neutral-600 hover:text-black transition-colors"
                  href="/terms"
                >
                  {t('policy.terms')}
                </Link>
              ) : word === '{1}' ? (
                <Link
                  className="font-medium text-neutral-600 hover:text-black transition-colors"
                  href="/privacy"
                >
                  {t('policy.privacy')}
                </Link>
              ) : (
                word
              )}
            </React.Fragment>
          ))
      )}
    </p>
  )
}

export default Policy