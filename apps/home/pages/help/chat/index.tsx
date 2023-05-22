import HelpLayout from '@/layouts/help-layout'

const ChatPage = () => {
  return (
    <HelpLayout
      headerChildren={(
        <h1 className="text-3xl">
          chat header
        </h1>
      )}
    >
      chat
    </HelpLayout>
  )
}

export default ChatPage