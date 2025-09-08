import { useParams } from "react-router";

const ChatPage = () => {
  const {id}=useParams();
  console.log(id);
  return (
    <div>
      Chat Page
    </div>
  )
}

export default ChatPage
