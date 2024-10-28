import { useState } from "react";
import { requestToGroqAI } from "../utils/groq";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SPLoader from "../components/Elements/Loader";
import "../index.css";
import "../App.css";
import "../components/Elements/ToggleTheme/Theme.css";
import TypeIt from "typeit-react";
import robotIcon from "../assets/robotIcon.png";

const Groq = (props) => {
  const { children } = props;
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const userId = localStorage.getItem('userId')

  const saveMessageToDB = async (message) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...message, userId }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Message saved successfully:', result);
    } catch (error) {
      console.error('Error saving message to database:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = document.getElementById("content").value;
    const message = `${content}, balas dengan bahasa Indonesia.`
    if (!content) return;
    const userMessage = { userId, sender: "user", textMessage: content };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    saveMessageToDB(userMessage);

    try {
      setLoading(true);
      const aiResponse = await requestToGroqAI(message);
      const botMessage = { userId, sender: "bot", textMessage: aiResponse };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      saveMessageToDB(botMessage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`flex flex-col min-h-screen items-center w-full`}>
      <div className="fixed w-full">
        <h1 className="text-4xl font-bold text-blue-800 bg-black p-2">REACT | GROQ AI</h1>
        {children}
      </div>

      <div className="flex flex-col w-full mb-32 px-10">
        <div className="flex flex-1 w-full mb-12 text-start rounded-md">
          {!messages.length ? (
            <div className="flex mt-40">
              <img src={robotIcon} className="w-12 h-12 " />
              <h2 className="text-xl text-blue-400">
                Halo saya AbyaBot, dari Groq AI. Ada yang bisa saya bantu?
              </h2>
            </div>
          ) : null}
          {loading && <SPLoader />}
          <div className="flex flex-col message-container w-full mt-40">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`} >
                {msg.sender === "bot" ? (
                  <div className="mx-4">
                    <TypeIt options={{ speed: 10 }}>
                      <img src={robotIcon} className="w-12 h-12 " />
                      <SyntaxHighlighter
                        wrapLongLines={true}
                        className="flex-1 rounded-md p-4"
                        language="swift"
                        style={darcula} >
                        {msg.textMessage}
                      </SyntaxHighlighter>
                    </TypeIt>
                  </div>
                ) : (
                  <div className="flex justify-end w-full">
                    <div className="w-fit bg-slate-400 text-end rounded-full px-5 py-3">
                      <p className="text-lg">{msg.textMessage}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <form className="fixed bottom-2 flex flex-col gap-4 py-4 max-w-3xl w-full text-black" onSubmit={handleSubmit}>
        <input type="text" placeholder="Ketik Permintaan disini....." id="content" className="py-2 px-4 font-bold rounded-full" />
        <button type="submit" className="bg-blue-800 py-2 px-4 font-bold text-white rounded-full">
          Kirim
        </button>
      </form>
    </main>
  );
};

export default Groq;
