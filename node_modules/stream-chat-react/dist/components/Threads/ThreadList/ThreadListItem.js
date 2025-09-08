import React, { createContext, useContext } from 'react';
import { useComponentContext } from '../../../context';
import { ThreadListItemUI as DefaultThreadListItemUI } from './ThreadListItemUI';
const ThreadListItemContext = createContext(undefined);
export const useThreadListItemContext = () => useContext(ThreadListItemContext);
export const ThreadListItem = ({ thread, threadListItemUIProps, }) => {
    const { ThreadListItemUI = DefaultThreadListItemUI } = useComponentContext();
    return (React.createElement(ThreadListItemContext.Provider, { value: thread },
        React.createElement(ThreadListItemUI, { ...threadListItemUIProps })));
};
// const App = () => {
//   const route = useRouter();
//   return (
//     <Chat>
//       {route === '/channels' && (
//         <Channel>
//           <MessageList />
//           <Thread />
//         </Channel>
//       )}
//       {route === '/threads' && (
//         <Threads>
//           <ThreadList />
//           <ThreadProvider>
//             <Thread />
//           </ThreadProvider>
//         </Threads>
//       )}
//     </Chat>
//   );
// };
// pre-built layout
{
    /*
  <Chat client={chatClient}>
    <Views>
      // has default
      <ViewSelector onItemPointerDown={} />
      <View.Chat>
        <Channel>
          <MessageList />
          <MessageInput />
        </Channel>
      </View.Chat>
      <View.Thread> <-- activeThread state
        <ThreadList /> <-- uses context for click handler
        <WrappedThread /> <-- ThreadProvider + Channel combo
      </View.Thread>
    </Views>
  </Chat>;
  */
}
