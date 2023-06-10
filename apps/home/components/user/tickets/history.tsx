import { useState } from 'react'

import { Button } from '@/components/button'
import Loader from '@/components/loader'
import usePurchaseHistory from '@/graphql/user/purchase-history'
import requestRefundMutation from '@/graphql/user/request-refund'
import capitalizeFirstLetters from '@/lib/capitalize-first-letters'

import { useTranslation } from 'next-i18next'
import toast from 'react-hot-toast'

interface HistoryProps {
  subscriptionOnly?: boolean
}
const History = ({ subscriptionOnly = false }: HistoryProps) => {
  const { data, isLoading } = usePurchaseHistory({
    subscriptionOnly,
  })
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { i18n } = useTranslation()
  const { t } = useTranslation('user-ticket')

  return (
    <div className="">
      <div className="grid grid-cols-[2fr_1fr_1fr] border-b border-neutral-200 pb-2 px-4">
        <p className="font-medium">
          {t('ride')}
        </p>
        <p className="font-medium">
          {t('price')}
        </p>
        <p className="font-medium">
          {t('Date')}
        </p>
      </div>
      {isLoading && (
        <div className="mt-7">
          <Loader />
        </div>
      )}
      {data?.length === 0 && !isLoading && (
        <div className="mt-7 flex flex-col">
          <p className="text-center text-neutral-500">
            {t('NoHistory')}
          </p>
        </div>
      )}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {data?.map((ticket: any) => {
        const ticketDate = new Date(ticket.date)
        const now = new Date()
        const oneHourBeforeDeparture = new Date(ticketDate.getTime() - 60 * 60 * 1000)

        const isRefundable = ticket.refundRequest === null && now < oneHourBeforeDeparture

        return (
          <div key={ticket.id}>
            <button
              className="w-full hover:bg-neutral-100 transition-colors duration-200 ease-in-out"
              onClick={() => setExpandedId(prev => {
                if (prev === ticket.id) return null
                return ticket.id
              })}
            >
              <div className="w-full text-left grid grid-cols-[2fr_1fr_1fr] border-b border-neutral-200 py-3 px-4 ">
                <p className="ltr:text-left rtl:text-right">
                
                  {i18n.language === 'ar' ? ticket.from.name_ar : ticket.from.name} {t('to')} {i18n.language === 'ar' ? ticket.to.name_ar : ticket.to.name}
                </p>
                <p className="text-neutral-500 ltr:text-left rtl:text-right">
                  {ticket.price.toLocaleString([i18n.language === 'ar' ? 'ar-EG' : 'en-US'], {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  {' '}
                  {t('EGP')}
                </p>
                <p className="text-neutral-500 ltr:text-left rtl:text-right">
                  {new Date(ticket.date).toLocaleDateString(
                    i18n.language === 'ar' ? 'ar-EG' : 'en-US',
                    {
                      day: 'numeric',
                      year: 'numeric',
                      month: 'long',
                    },
                  )}
                  {' '}
                  {t('at')}
                  {' '}
                  {new Date(ticket.date).toLocaleTimeString(
                    i18n.language === 'ar' ? 'ar-EG' : 'en-US',
                    {
                      hour: 'numeric',
                      minute: 'numeric',
                    },
                  )}
                </p>
              </div>
            </button>
            {expandedId === ticket.id && (
              <div className="px-4 py-2 ml-5 text-sm text-neutral-500 mb-4 flex flex-col items-start gap-2">
                <div>
                  <p className="font-medium">
                    {t('passengers')}
                  </p>
                  <p>
                    {ticket.passengers?.adults ?? 1}
                    {' '}
                    {t('adults')}
                  </p>
                  <p>
                    {ticket.passengers?.seniors ?? 0}
                    {' '}
                    {t('seniors')}
                  </p>
                  <p>
                    {ticket.passengers?.children ?? 0}
                    {' '}
                    {t('children')}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  {ticket.refundRequest ? (
                    <>
                      <p className="font-medium mt-4">
                        {t('Refund')} {t('Request')}
                      </p>
                      <div>
                        <p className="font-medium">
                          {t('Status')}
                        </p>
                        <p>
                          {capitalizeFirstLetters(ticket.refundRequest.status)}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">
                          {t('RequestedAt')}
                        </p>
                        <p>
                          {new Date(ticket.refundRequest.createdAt).toLocaleDateString(
                            i18n.language === 'ar' ? 'ar-EG' : 'en-US',
                            {
                              day: 'numeric',
                              year: 'numeric',
                              month: 'long',
                            },
                          )}
                          {' '}
                          {t('at')}
                          {' '}
                          {new Date(ticket.refundRequest.createdAt).toLocaleTimeString(
                            i18n.language === 'ar' ? 'ar-EG' : 'en-US',
                            {
                              hour: 'numeric',
                              minute: 'numeric',
                            },
                          )}
                        </p>
                      </div>
                      {ticket.refundRequest.status !== 'PENDING' && (
                        <div>
                          <p className="font-medium">
                            {t('ReviewedAt')}
                          </p>
                          <p>
                            {new Date(ticket.refundRequest.updatedAt).toLocaleDateString(
                              i18n.language === 'ar' ? 'ar-EG' : 'en-US',
                              {
                                day: 'numeric',
                                year: 'numeric',
                                month: 'long',
                              },
                            )}
                            {' '}
                            {t('at')}
                            {' '}
                            {new Date(ticket.refundRequest.updatedAt).toLocaleTimeString(
                              i18n.language === 'ar' ? 'ar-EG' : 'en-US',
                              {
                                hour: 'numeric',
                                minute: 'numeric',
                              },
                            )}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {isRefundable && (
                        <Button
                          useLoading
                          variant="linkSecondary"
                          className="!px-0 !py-0"
                          onClick={async () => {
                            try {
                              await requestRefundMutation({
                                id: ticket.id,
                                ticketType: {
                                  ticketType: 'TICKET',
                                },
                              })
                              toast.success('Refund request sent successfully')
                              setExpandedId(null)
                            } catch (e) {
                              toast.error('Something went wrong')
                            }
                          }}
                        >
                          {t('Request')} {t('Refund')}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default History