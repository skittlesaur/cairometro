import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import Link from 'next/link'

import { SignupStepProps } from '@/components/authentication/signup/index'
import CloudUploadOutline from '@/icons/cloud-upload-outline.svg'

import axios from 'axios'
import cn from 'classnames'
import { useTranslation } from 'next-i18next'
import { FileUploader } from 'react-drag-drop-files'
import toast from 'react-hot-toast'

export type documentRefType = {
  isValid: () => boolean
  getValues: () => {
    documentUrl: string
  }
}

const Documents = forwardRef(({ nextStep }: SignupStepProps, ref) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [documentUrl, setDocumentUrl] = useState<string>('')

  const { t } = useTranslation('signup')

  const headingBreak = Math.floor(t('email.heading').split(' ').length / 2 - 1)

  useImperativeHandle(ref, () => ({
    isValid: () => {
      return documentUrl !== ''
    },
    getValues: () => {
      return {
        documentUrl,
      }
    },
  }))

  const fileUploaderHandleChange = useCallback(
    async (file: string) => {
      setIsLoading(true)

      const CLOUDINARY_UPLOAD_PRESET = 'cairo-metro'
      const CLOUDINARY_UPLOAD_URL =
        'https://api.cloudinary.com/v1_1/dy9mp2tho/image/upload'

      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

      try {
        const { data } = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })

        const { secure_url: secureUrl } = data
        setDocumentUrl(secureUrl)
      } catch (e) {
        toast.error(t('documents.uploadError'))
      }
    },
    [t]
  )

  useEffect(() => {
    if (documentUrl) {
      nextStep()
    }
  }, [documentUrl, nextStep])

  return (
    <div className="flex flex-col h-full items-center justify-between gap-7">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-center">
          {t('documents.heading')
            .split(' ')
            .map((line, index) => (
              <React.Fragment key={index}>
                {line} {index === headingBreak && <br />}
              </React.Fragment>
            ))}
        </h1>
        <div>
          <p className="text-sm text-neutral-500 inline ltr:mr-2 rtl:ml-2">
            {t('documents.description')}
          </p>
          <Link
            href="/help/senior-verification"
            className="inline text-sm font-medium text-neutral-800 hover:text-black hover:underline transition-colors"
          >
            {t('documents.learnMore')}
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full h-full grow justify-end">
        <FileUploader
          required
          handleChange={fileUploaderHandleChange}
          name="senior-verification"
          multiple={false}
          accept="image/*"
          maxSize={1}
          minSize={0}
          disabled={isLoading || !!documentUrl}
          classes="-mx-8"
        >
          <div
            className={`cursor-pointer p-10 transition-colors text-neutral-500 hover:text-neutral-600 group aspect-video w-full grow rounded-2xl border-2 border-dashed border-neutral-300 hover:border-neutral-400 flex flex-col items-center justify-center gap-2 ${cn(
              {
                'cursor-not-allowed': isLoading || !!documentUrl,
              }
            )}`}
          >
            <CloudUploadOutline
              className={`w-24 h-24 ${cn({
                'animate-arrow': isLoading,
              })}`}
            />
            <p className="font-medium">{t('documents.dragAndDrop')}</p>
          </div>
        </FileUploader>
      </div>
    </div>
  )
})

Documents.displayName = 'Signup-Documents'

export default Documents
