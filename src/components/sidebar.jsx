import profilepic from '../assets/profileicon.svg';
import { useUser } from '../components/UserContext';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { database } from '../config/firebase';
import { Link } from 'react-router-dom';
import { FaBars, FaNewspaper } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import Loading from "../components/Loading";
import logo from '../assets/logo.png';
import profileicon from '../assets/profileicon.svg'
import { GoHomeFill } from "react-icons/go";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { MdPersonSearch } from "react-icons/md";
import { IoMailUnread } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { ImNewspaper } from "react-icons/im";
import { IoGameController } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { signOut } from 'firebase/auth';

const Sidebar = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isNewsVisible, setIsNewsVisible] = useState(false);
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  const [profiles, setprofiles] = useState('');
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userRef = doc(database, "Users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUsername(userData.username || 'No Username');
          setRole(userData.role || 'No Role');
          setEmail(userData.email || 'No email found');
          setprofiles(userData.profilePic);
        } else {
          navigate("/signin");
        }
      } else {
        navigate("/signin");
      }
    };

    fetchUserData();
  }, [navigate]);

  const getNews = () => {
    fetch('/api/getNews') 
      .then((res) => res.json())
      .then((json) => setNews(json.articles))
      .catch((error) => console.error('Error:', error));
  };
  

  useEffect(() => {
    getNews();
    const interval = setInterval(() => getNews(), 300000);
    return () => clearInterval(interval);
  }, []);

  const newsList = news.slice(0, 15);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleNewsVisibility = () => {
    setIsNewsVisible(!isNewsVisible);
  };

  return (
    <div className="relative z-10">
      <div className="cursor-pointer absolute z-10 top-2 left-2 m-2" onClick={toggleVisibility}>
        {isVisible ? <MdKeyboardArrowLeft className="relative left-56 md:left-64 text-2xl rounded-full inverter mt-2 scale-[130%] hover:scale-150 transition-all" /> : <FaBars className="text-2xl hover:scale-110 transition-all" />}
      </div>

      <div className={`absolute z-0 md:w-[20vw] md:h-[100%] w-[75vw] h-full bg-gradient-to-b from-[#1E3A8A] to-[#3B82F6]  transition-transform duration-300 ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center ">
          {/* <div><img src={logo} className='w-16 rounded-full' alt="" /></div> */}
          <div className="heading russo text-white pl-8 text-4xl pt-5">KOTINOS</div>
        </div>
        <div className="flex flex-row items-center justify-center gap-3 absolute top-[89vh] md:top-[87vh] p-2 bg-gray-300 w-full hover:bg-opacity-10 bg-opacity-5">
          <div><img src={profiles || profileicon} className=" h-10 w-10 md:w-14 md:h-14 rounded-full bg-gray-500 mt-[20px]" /></div>
          <Link to='/profile'>
            <div className="flex flex-col justify-center">
              <h1 className='russo text-white md:text-lg'> {username}</h1>
              <h3 className=' text-white md:text-sm'>Logged in as {role}</h3>
            </div>
          </Link>
          <button onClick={logout} className='inverter md:ml-10 ml-4 russo hover:scale-110 transition-all cursor-pointer '><MdLogout className='scale-[160%]' /></button>

        </div>
        <br />
        <div className="px-4">
          <Link to='/home' className=' russo inverter'>
            <div className="flex items-center hover:scale-105 hover:bg-black hover:bg-opacity-5 rounded-full p-1 my-3 transition-all cursor-pointer gap-5 md:gap-5 pl-4">
              <div>
                <GoHomeFill className='scale-[160%]' />
              </div>
              <div className='russo mt-1 text-xl'>Home</div>
            </div>
          </Link>
          <Link to='/chatpage' className=' russo inverter'>
            <div className="flex items-center hover:scale-105 hover:bg-black hover:bg-opacity-5 rounded-full p-1 my-3 transition-all cursor-pointer gap-5 md:gap-5 pl-4">
              <div>
                <IoChatbubbleEllipses className='scale-[160%]' />
              </div>
              <div className='russo mt-1 text-xl'>Messages</div>
            </div>
          </Link>
          <Link to='/invitation' className=' russo inverter'>
            <div className="flex items-center hover:scale-105 hover:bg-black hover:bg-opacity-5 rounded-full p-1 my-3 transition-all cursor-pointer gap-5 md:gap-5 pl-4">
              <div>
                <IoIosNotifications className='scale-[180%]' />
              </div>
              <div className='russo mt-1 text-xl'>Notifications</div>
            </div>
          </Link>
          <Link to='/profile' className=' russo inverter'>
            <div className="flex items-center hover:scale-105 hover:bg-black hover:bg-opacity-5 rounded-full p-1 my-3 transition-all cursor-pointer gap-5 md:gap-5 pl-4">
              <div>
                <IoPersonSharp className='scale-[160%]' />
              </div>
              <div className='russo mt-1 text-xl'>Profile</div>
            </div>
          </Link>
          <Link to='/network' className=' russo inverter' state={{ username: username, role: role, email: email }}>
            <div className="flex items-center hover:scale-105 hover:bg-black hover:bg-opacity-5 rounded-full p-1 my-3 transition-all cursor-pointer gap-5 md:gap-5 pl-4">
              <div>
                <IoIosPeople className='scale-[180%]' />
              </div>
              <div className='russo mt-1 text-xl'>Friends</div>
            </div>
          </Link>
          <Link to='/connection' className=' russo inverter'>
            <div className="flex items-center hover:scale-105 hover:bg-black hover:bg-opacity-5 rounded-full p-1 my-3 transition-all cursor-pointer gap-5 md:gap-5 pl-4">
              <div>
                <MdPersonSearch className='scale-[180%]' />
              </div>
              <div className='russo mt-1 text-xl'>Find People</div>
            </div>
          </Link>
          
          <Link to='/invitation' className=' russo inverter' state={{ username: username, role: role, email: email }}>
            <div className="flex items-center hover:scale-105 hover:bg-black hover:bg-opacity-5 rounded-full p-1 my-3 transition-all cursor-pointer gap-5 md:gap-5 pl-4">
              <div>
                <IoMailUnread className='scale-[180%]' />
              </div>
              <div className='russo mt-1 text-xl'>Invites</div>
            </div>
          </Link>
            <div className="flex items-center inverter hover:scale-105 hover:bg-black hover:bg-opacity-5 rounded-full p-1 my-1 transition-all cursor-pointer gap-5 md:gap-5 pl-4" onClick={toggleNewsVisibility}>
              <div>
                <ImNewspaper className='scale-[180%]' />
              </div>
              <div className='russo mt-1 text-xl'>News</div>
            </div>
            {/* <Link to='/game' className=' russo inverter' state={{ username: username, role: role, email: email }}>
            <div className="flex items-center hover:scale-105 hover:bg-black hover:bg-opacity-5 rounded-full p-1 my-3 transition-all cursor-pointer gap-5 md:gap-5 pl-4">
              <div>
                <IoGameController className='scale-[180%]' />
              </div>
              <div className='russo mt-1 text-xl'>Game</div>
            </div>
          </Link> */}
          <Link to='/aichatbot' className=' russo inverter' state={{ username: username, role: role, email: email }}>
            <div className="flex items-center hover:scale-105 hover:bg-black hover:bg-opacity-5 rounded-full p-1 my-3 transition-all cursor-pointer gap-5 md:gap-5 pl-4">
              <div>
                <IoIosPeople className='scale-[180%]' />
              </div>
              <div className='russo mt-1 text-xl'>Chatbot</div>
            </div>
          </Link>
        </div>
      </div>

      {isNewsVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 p-4 overflow-y-scroll flex justify-center">
          <div className="absolute top-0 right-0 m-4 cursor-pointer" onClick={toggleNewsVisibility}>
            <IoClose className="text-2xl bg-white rounded-full" />
          </div>
          <div className="md:w-[40vw] w-[90vw] h-[80vh] bg-white border rounded-lg max-h-screen overflow-y-scroll p-2 px-6 m-2">
            <h1 className='russo text-3xl text-center py-2'>Sports News</h1>
            {newsList && newsList.length > 0 ? (
              <ul>
                {newsList.map((article, index) => (
                  <li key={index} className='py-2'>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="w-full h-auto rounded-xl" />}
                      <p className='russo pt-3'>{article.title}</p>
                    </a>
                    <hr className="border-t border-gray-300 my-4" />
                  </li>

                ))}
              </ul>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;