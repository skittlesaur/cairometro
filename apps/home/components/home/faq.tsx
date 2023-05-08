import React from 'react'
import Link from 'next/link'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/accordion'

import { useTranslation } from 'next-i18next'

const Faq = () => {
  const { t } = useTranslation('home')

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="font-semibold text-5xl text-[#000000] mb-16">
        {t('faq.title')}
      </h1>
      <Accordion
        collapsible
        defaultValue="item-1"
        type="single"
        className={'space-y-5 w-full'}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>{t('faq.question1.title')}</AccordionTrigger>
          <AccordionContent>
            {t('faq.question1.answer')
              .split(' ')
              .map((word, index) => (
                <React.Fragment key={index}>
                  {index !== 0 && ' '}
                  {word === '{0}' ? (
                    <Link
                      className="text-primary font-semibold hover:text-primary/80 transition-color"
                      href={'/subscription'}
                    >
                      {t('faq.question1.subscription')}
                    </Link>
                  ) : (
                    word
                  )}
                </React.Fragment>
              ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>{t('faq.question2.title')}</AccordionTrigger>
          <AccordionContent>{t('faq.question2.answer')}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>{t('faq.question3.title')}</AccordionTrigger>
          <AccordionContent>{t('faq.question3.answer')}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>{t('faq.question4.title')}</AccordionTrigger>
          <AccordionContent>{t('faq.question4.answer')}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>{t('faq.question5.title')}</AccordionTrigger>
          <AccordionContent>{t('faq.question5.answer')}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Faq
