import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import Navbar from "../components/navbar";
import { auth, database } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import Aibutton from "../components/animata/button/ai-button";
import { AiOutlineSend } from "react-icons/ai";
import AiButton from "../components/animata/button/ai-button";
import AnimatedBeam from "../components/animata/button/animated-beam";
import '../pages/Aichatbot.css'

const API_KEY = import.meta.env.VITE_AI_APP_ID;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = new Date();
      setDate(currentDate.toLocaleDateString());
      setTime(currentDate.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const user = auth.currentUser;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile2 = async () => {

      if (user) {
        try {
          const docRef = doc(database, "Users", auth.currentUser?.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const reference = docSnap.data();
            setUsername(reference.username)
            if (reference.role === 'user') {
              setRole('General Sports Lover')
            } else {
              setRole(reference.role);
            }
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          navigate('/signin');
        }
      }
    };

    fetchProfile2();
  }, [user, navigate, role]);
  const systemPrompt = `
  You are an AI chatbot named Rio, specialized in answering only sports and health-related questions. 
  You are the chat bot for Kotinos, a sports management app. 
  Make your answers informative and engaging.
  If a user asks about something unrelated, politely tell them you can only answer sports and health questions. But u may also answer some general questions.
  If user asks who you are, just say you are Rio.
  If some one asks you who created Kotinos, you should describe the team behind it as, Kesavan G(team leader, worked on full stack web development, this website is managed and created by him. he created the entire frontend and backend was primarily handled by him with other guys help. Dont elevate him so much but remember he has worked a lot.), Aditya(chief Designer and helped in training Rio), Adwaith J(worked on backend of the website), Amal Sajeev(worked on development of Rio, the Ai assistant in Kotinos. He is the main man behind the Rio. He was the one who created you primarily). Briefly explain about them. when someone asks about the team behind Kotinos or about the one who created you, you should very briefly explain about them. if someone asks about who created you, you should talk about the entire Kotinos team briefly, minimum 200 words with whitespaces.
  If some one questions you about date just give them ${date} and if they ask about current time just give them ${time} and in other cases give them both, with some more funny texts.
  You should address the person who is speaking with you as ${username} and he is a ${role}. address them with their name only once in a conversation, not everytime.
  `;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", parts: [{ text: input }] };
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = [
        { role: "user", parts: [{ text: systemPrompt }] },
        ...messages.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.content }],
        })),
        userMessage,
      ];

      const chatSession = model.startChat({ history: chatHistory });
      const result = await chatSession.sendMessage(input);
      const responseText = result.response.text
        ? await result.response.text()
        : result.response.candidates[0]?.content || "No response";

      const botMessage = { role: "model", content: responseText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: `⚠ Error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
    }, 100);
  }, [messages, isLoading]);

  return (
    <>

      {/* <Navbar /> */}
      <AnimatedBeam><div className="text-white ">
        <div className="w-full h-[100vh] overflow-hidden flex flex-col ">
          {/* Chat Header */}
          <div className="p-5 w-full flex justify-center text-center font-bold text-4xl text-[beige]">
            <div className="animate-text w-fit px-4 bg-opacity-10 backdrop-blur-sm bg-gradient-to-r from-teal-500 via-purple-500 to-blue-500 bg-clip-text h-fit pb-3 text-transparent text-5xl font-black">
              Rio - Your AI Sports Buddy
            </div>
          </div>

          {/* Chat Messages */}

          <div
            className="flex-1 flex  flex-col items-center overflow-y-auto p-5 space-y-3 chat-bot-ctr "
            ref={chatBoxRef}
          >

            <div className="md:w-1/2 w-full ">
              {messages.length === 0 ? (
                <div className=" text-[beige] w-full text-center h-[50vh] text-3xl flex justify-center items-center mx-auto">
                  <div className="backdrop-blur-sm bg-opacity-10 py-14 px-10">
                    Welcome back {username}, How can I assist you today?
                  </div>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl ${msg.role === "user"
                      ? "bg-gradient-to-r from-[#0057D9] to-[#002F6C] text-white self-end ml-auto w-fit my-5"
                      : "text-[beige] w-full my-5 backdrop-blur-sm bg-opacity-10"
                      }`}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ))
              )}
            </div>



            {/* Bot Typing Animation */}
            {isLoading && (
              <div className="self-start p-4 rounded-2xl w-full text-gray-400 animate-pulse">
                <div className="flex md:w-1/2 w-full md:ml-7 ml-3 md:justify-center md:items-center space-x-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-200">●</span>
                  <span className="animate-bounce delay-500">●</span>
                </div>
              </div>
            )}
          </div>

          <div onClick={() => setInput("How to recover from a sports injury?")} className=" relative z-50 flex items-center justify-center p-4 bg-[#0A0F38]/0 h-20">
            <AiButton className="" />
          </div>
          {/* Input & Send Button */}
          <div className="flex items-center justify-center p-4 bg-opacity-0 bg-[#001F54]">

            <div className="md:w-1/2 w-full flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 p-3 md:w-[90%] w-[70%] ml-4 md:ml-0 rounded-full border border-gray-500 bg-[#002F6C] text-white focus:outline-none focus:ring-2 focus:ring-[#0057D9] shadow-md"
              />
              <button
                onClick={handleSend}
                className="ml-3 py-4 bg-gradient-to-r from-[#003B8B] to-[#007BFF] text-white px-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
              >
                <AiOutlineSend className="ml-1" />
              </button>
            </div>

          </div>

        </div>

      </div></AnimatedBeam>

    </>
  );
};

export default ChatBot;
