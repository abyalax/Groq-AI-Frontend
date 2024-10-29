import { useState } from "react";
import { requestToGroqAI } from "../utils/groq";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SPLoader from "../components/Elements/Loader";
import "../index.css";
import "../App.css";
import "../components/Elements/ToggleTheme/Theme.css";
import TypeIt from "typeit-react";
import PropTypes from "prop-types";
import { img, svg } from "../assets/getter";

const Groq = (props) => {
  const { children } = props;
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const userId = localStorage.getItem('userId')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = document.getElementById("content").value;
    const message = `${content}, balas dengan bahasa Indonesia.`
    if (!content) return;
    const userMessage = { userId, sender: "user", textMessage: content };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    try {
      setLoading(true);
      const aiResponse = await requestToGroqAI(message);
      const botMessage = { userId, sender: "bot", textMessage: aiResponse };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      document.getElementById("form").reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`flex flex-col min-h-screen items-center w-full`}>
      <div className="fixed w-full flex justify-center items-center flex-col">
        <h1 className="text-4xl font-bold text-blue-800 p-2 text-center">WELCOME | GROQ AI</h1>
        {children}
      </div>

      <div className="flex flex-col w-full mb-32 px-10">
        <div className="flex flex-1 w-full mb-12 text-start rounded-md">
          {!messages.length ? (
            <div className="flex mt-40">
              <img src={img.robot} className="w-12 h-12 " />
              <h2 className="text-xl text-blue-400">
                Halo saya bot buatan Abya, dari Groq AI. Ada yang bisa saya bantu?
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
                      <img src={img.robot} className="w-12 h-12 " />
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

      <div className="fixed bottom-6 w-full">
        <form id="form" className="relative mx-auto flex flex-col gap-4 py-4 max-w-3xl w-full" onSubmit={handleSubmit}>
          <input type="text" placeholder="Ketik Perintah disini....." id="content" className="py-3 px-4 font-bold rounded-full text-black" />
          <button type="submit" className="absolute right-2 top-5 bg-blue-800 p-2 h-10 w-10 font-bold text-white rounded-full">
            <img src={svg.arrow} className="m-auto h-full w-full" />
          </button>
        </form>
      </div>
    </main>
  );
};

Groq.propTypes = {
  children: PropTypes.node.isRequired,
}
export default Groq;
