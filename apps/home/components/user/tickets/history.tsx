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

  return (
    <div className="">
      <div className="grid grid-cols-[2fr_1fr_1fr] border-b border-neutral-200 pb-2 px-4">
        <p className="font-medium">
          Ride
        </p>
        <p className="font-medium">
          Price
        </p>
        <p className="font-medium">
          Date
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
            No tickets found
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
              <div className="w-full text-left grid grid-cols-[2fr_1fr_1fr] border-b border-neutral-200 py-3 px-4">
                <p className="">
                  {ticket.from.name} to {ticket.to.name}
                </p>
                <p className="text-neutral-500">
                  {ticket.price.toLocaleString([i18n.language === 'ar' ? 'ar-EG' : 'en-US'], {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  {' '}
                  EGP
                </p>
                <p className="text-neutral-500">
                  {new Date(ticket.date).toLocaleDateString(
                    i18n.language === 'ar' ? 'ar-EG' : 'en-US',
                    {
                      day: 'numeric',
                      year: 'numeric',
                      month: 'long',
                    },
                  )}
                  {' '}
                  at
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
                    Passengers
                  </p>
                  <p>
                    {ticket.passengers?.adults ?? 1}
                    {' '}
                    adults
                  </p>
                  <p>
                    {ticket.passengers?.seniors ?? 0}
                    {' '}
                    seniors
                  </p>
                  <p>
                    {ticket.passengers?.children ?? 0}
                    {' '}
                    children
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  {ticket.refundRequest ? (
                    <>
                      <p className="font-medium mt-4">
                        Refund Request
                      </p>
                      <div>
                        <p className="font-medium">
                          Status
                        </p>
                        <p>
                          {capitalizeFirstLetters(ticket.refundRequest.status)}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">
                          Requested at
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
                          at
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
                            Reviewed at
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
                            at
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
                          Request Refund
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