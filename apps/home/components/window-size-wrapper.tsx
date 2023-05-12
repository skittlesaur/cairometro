/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import useWindowSize from '@/lib/use-window-size'

interface WindowSizeWrapperProps {
  MobileComponent: React.ComponentType<any>
  TabletComponent?: React.ComponentType<any>
  DesktopComponent: React.ComponentType<any>
}

const WindowSizeWrapper = ({
  MobileComponent,
  TabletComponent,
  DesktopComponent,
}: WindowSizeWrapperProps) => {
  const ResizerComponent = (props: any) => {
    const { isMobile, isTablet } = useWindowSize()

    if (isMobile && MobileComponent) {
      return <MobileComponent {...props} />
    }

    if ((isMobile || isTablet) && TabletComponent) {
      return <TabletComponent {...props} />
    }

    return <DesktopComponent {...props} />
  }

  return ResizerComponent
}

export default WindowSizeWrapper