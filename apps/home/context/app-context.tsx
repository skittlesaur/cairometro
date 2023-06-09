import { createContext, ReactNode, useContext, useState } from 'react'

interface PurchaseData {
  title: string
  price: number
  description?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metaData: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutation: (args: any)=> Promise<void>
}

interface AppContextType {
  purchaseModal: {
    isOpen: boolean
    data: PurchaseData
    open: (item: PurchaseData)=> void
    close: ()=> void
  }
}
const appContext = createContext<AppContextType>({} as AppContextType)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [purchaseModal, setPurchaseModal] = useState({
    isOpen: false,
    data: {} as PurchaseData,
  })

  const openPurchaseModal = (data: PurchaseData) => {
    setPurchaseModal({
      isOpen: true,
      data,
    })
  }

  const closePurchaseModal = () => {
    setPurchaseModal({
      isOpen: false,
      data: {} as PurchaseData,
    })
  }

  const value = {
    purchaseModal: {
      ...purchaseModal,
      open: openPurchaseModal,
      close: closePurchaseModal,
    },
  }

  return <appContext.Provider value={value}>{children}</appContext.Provider>
}

export const useAppContext = (): AppContextType => {
  const context = useContext(appContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}