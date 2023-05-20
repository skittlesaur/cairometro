import HelpLayout from '@/layouts/help-layout'

const HelpPage = () => {
  return (
    <HelpLayout
      headerChildren={(
        <h1 className="text-3xl">
          Help Center
        </h1>
      )}
    >
      content
    </HelpLayout>
  )
}

export default HelpPage