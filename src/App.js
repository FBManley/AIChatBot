import './App.css';
import {useState} from 'react'
import '@chatscope/chat-ui-kit-styes/dist/default/styles.min.css'
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from "@chatscope"

function App() {
  const [messages, setMessages] = useState([{
    message: "Hello, I'm ChatGPT",
    sneder: "ChatGPT"
  }])
  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }
    const newMessages = [...messages, newMessage];
    //update our message state
    setMessages(newMessages)
    // process message to chatGPT
  }
  return (
    <div className="App">
     <div style={{position: "relative", height: "800px", width: "700px"}}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
          {messages.map((message, i) => {
            return <Message key={i} model={message}/>
          })}
          </MessageList>
          <MessageInput placeholder='Type Message Here' onSend={handleSend}/>
        </ChatContainer>
      </MainContainer>
     </div>
    </div>
  );
}

export default App;
