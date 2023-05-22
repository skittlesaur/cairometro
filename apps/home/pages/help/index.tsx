import Faq from '@/components/faq'
import HelpCard from '@/components/help/card'
import ContactUs from '@/components/help/contact-us'
import AccessibilityIcon from '@/icons/accessibility-outline.svg'
import LinesIcon from '@/icons/analytics-outline.svg'
import RulesIcon from '@/icons/document-outline.svg'
import HelpLayout from '@/layouts/help-layout'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const HelpPage = () => {
  const pages = [
    {
      title: 'Special Needs',
      href: '/help/instructions/special-needs',
      Icon: AccessibilityIcon,
    },
    {
      title: 'Rules & Code of Conduct',
      href: '/help/instructions/rules',
      Icon: RulesIcon,
    },
    {
      title: 'Lines and Schedules',
      href: '/help/instructions/lines-and-schedule',
      Icon: LinesIcon,
    },
  ]
  
  return (
    <HelpLayout
      contentBackground="bg-gray-50"
      headerChildren={(
        <h1 className="text-3xl">
          Help Center
        </h1>
      )}
    >
      <div className="flex flex-col gap-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pages.map(({ title, href, Icon }) => (
            <HelpCard
              key={title}
              href={href}
            >
              <div className="w-14 h-14 text-black">
                <Icon />
              </div>
              <h1 className="!font-normal !text-lg">
                {title}
              </h1>
            </HelpCard>
          ))}
        </div>
        <Faq />
        <ContactUs />
      </div>
    </HelpLayout>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['faq'])),
  },
})

export default HelpPage