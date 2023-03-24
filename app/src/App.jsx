import './App.css';
import {useState} from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from "@chatscope/chat-ui-kit-react"
const API_KEY = "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"

function App() {
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([{
    message: "Hello, I'm ChatGPT",
    sender: "ChatGPT"
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
    setTyping(true)
    await processMessageToChatGPT(newMessages)
  }
  async function processMessageToChatGPT(chatMessages){
    // chatMessages {sender: "user" or "chatGPT", message: "message content here"}
    // apiMessages {role: "user" or "assistant", content: "message content here"}
    // building array of objects 
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if(messageObject.sender === "ChatGPT"){
        role="assistant"
      } else {
        role = "user"
      }
      return { role: role, content: messageObject.message}
    });
    // role: "user" -> user message, "assistant" -> chatGPT response message
    // "system" -> generally one initial message defining HOW we want chatgpt to talk
    const systemMessage = {
      role: "system",
      contnent: "Explain content like im 10 years old." // explain like im a seasoned pro
    }
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages // [message1, message2, message3]
      ]
    }
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json()
    }).then((data) => console.log(data))
  }
  return (
    <div className="App">
     <div style={{position: "relative", height: "800px", width: "700px"}}>
      <MainContainer>
        <ChatContainer>
          <MessageList typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" /> : null} >
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