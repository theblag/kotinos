import Navbar from '../components/navbar';
import React, { useEffect, useState, useRef } from 'react';
import { Paper, Avatar, ListItem, ListItemText, List, Button, TextField, Modal, Box, Icon, Alert } from '@mui/material';
import profileicon from '../assets/profileicon.svg';
import { collection, doc, getDocs, addDoc, deleteDoc, getDoc, setDoc, query, where, updateDoc } from 'firebase/firestore';
import { database, auth } from '../config/firebase';
import Loading from '../components/Loading';
import addphoto from '../assets/addphoto.svg';
import deleteIcon from '../assets/deleteicon.svg'
import { Link, useNavigate } from 'react-router-dom';
import currencyicon from '../assets/currencyicon.svg'
import logo from '../assets/logo.png'
import Autocomplete from '@mui/material/Autocomplete';
import chatpageback from '../assets/chatbg3.webp'
import chat_bg from '../assets/chat_bg.png'
import { ArrowLeft } from 'lucide-react';
import { BiImageAdd } from "react-icons/bi";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { FiSearch } from 'react-icons/fi';
import ReadMore from '../components/Readmore';
const ChatPage = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageData, setMessageData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openGroupModal, setOpenGroupModal]=useState(false);
    const [openCommunityModal, setOpenCommunityModal]=useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [groupName, setGroupName] = useState('');
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groups, setGroups] = useState([]);
    const [grpmessage, setGrpMessage] = useState("");
    const [comMessage, setComMessage]=useState('');
    const [messages, setMessages] = useState([]);
    const [communityMessages, setCommunityMessages] = useState([]);
    const [groupNames, setGroupNames] = useState({});
    const [groupLastMessage, setGroupLastMessage] = useState({});
    const [groupLastMessageTime, setGroupLastMessageTime] = useState({});
    const [senderNames, setSenderNames] = useState({});
    const [view, setView] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [communityName, setCommunityName]=useState('');
    const [isCommunityEditing, setiscommunityEditing]=useState(false);
    const [communityDescription, setcommunityDescription]=useState('');
    const [communities, setCommunities]=useState([]);
    const [communityNames, setCommunityNames]=useState({});
    const [communityLastMessage, setCommunityLastMessage] = useState({});
    const [selectedCommunity, setSelectedCommunity]=useState(null);
    const [profilePics, setProfilePics] = useState({});
        const fetchingProfilePic = async (userIds) => {
        const userRef = doc(database, "Users", userIds);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            const userData = userSnap.data();
            return userData.profilePic
        } else {
            return profileicon
        }
        }
        useEffect(() => {
        const fetchProfilePics = async () => {
            const newProfilePics = {};
    
            for (const users of user) {
            const pic = await fetchingProfilePic(users.id);
            newProfilePics[users.id] = pic;
            }
    
            setProfilePics(newProfilePics);
        };
    
        fetchProfilePics();
        }, [user]);
    const checkScreenSize = () => {
        if (window.innerWidth <= 480) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };
    const handlegroupclosemodal = ()=>{
        setImages([]);
        setPreviewImages([]);
        setGrpMessage('');
        setOpenGroupModal(false);
    }
    const handlecommunityclosemodal = ()=>{
        setImages([]);
        setPreviewImages([]);
        setComMessage('');
        setOpenCommunityModal(false);
    }
    const handleuserclosemodal = ()=>{
        setImages([]);
        setPreviewImages([]);
        setMessage('');
        setOpenModal(false);
    }
    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);
    useEffect(() => {
        const fetchGroupNames = async () => {
            const groupNamesData = {};
            const groupLastMessageData = {}
            for (let groupId of groups) {
                const groupRef = doc(database, 'Groups', groupId);
                const groupDoc = await getDoc(groupRef);

                if (groupDoc.exists()) {
                    const groupData = groupDoc.data();
                    groupNamesData[groupId] = groupData.groupName;
                    groupLastMessageData[groupId]=groupData.lastMessage;
                }
            }
            setGroupLastMessage(groupLastMessageData);
            setGroupNames(groupNamesData);
        };

        fetchGroupNames();
    }, [groups, database]);
    useEffect(() => {
        const fetchCommunityNames = async () => {
            const groupNamesData = {};
            const groupLastMessageData = {}
            for (let groupId of communities) {
                const groupRef = doc(database, 'Community', groupId);
                const groupDoc = await getDoc(groupRef);

                if (groupDoc.exists()) {
                    const groupData = groupDoc.data();
                    groupNamesData[groupId] = groupData.communityName;
                    groupLastMessageData[groupId]=groupData.lastMessage;
                }
            }
            setCommunityLastMessage(groupLastMessageData);
            setCommunityNames(groupNamesData);
        };

        fetchCommunityNames();
    }, [communities, database]);
    const handleuserselection = (eachuser) => {
        setSelectedUser(eachuser);
        setSelectedGroup(null);
        setSelectedCommunity(null);
    }
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
                } else {
                    navigate("/signin");
                }
            } else {
                navigate("/signin");
            }
        };

        fetchUserData();
    }, [navigate]);

    useEffect(() => {
        const fetchUserGroups = async () => {
            const userGroupsRef = collection(database, 'Users', auth.currentUser?.uid, 'Groups');
            const querySnapshot = await getDocs(userGroupsRef);

            const userGroups = [];
            querySnapshot.forEach((doc) => {
                userGroups.push(doc.id);
            });
            setGroups(userGroups);
        };

        fetchUserGroups();
    }, [auth.currentUser]);
    useEffect(() => {
        const fetchCommunities = async () => {
            const userGroupsRef = collection(database, 'Community');
            const querySnapshot = await getDocs(userGroupsRef);

            const userGroups = [];
            querySnapshot.forEach((doc) => {
                userGroups.push(doc.id);
            });
            setCommunities(userGroups);
        };

        fetchCommunities();
    }, [auth.currentUser]);
    if (!auth.currentUser) {
        return <Loading />;
    }
    const handlenavigation = (userId) => {
        navigate(`/displayQr/${userId}`);
    }
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 3) {
            alert("You can select a maximum of 3 images.");
            return;
        }
        const newImages = [...images, ...files];
        setImages(newImages);

        const previewUrls = newImages.map((file) => URL.createObjectURL(file));
        setPreviewImages(previewUrls);
    };

    const handleDeletePreviewImage = (imageUrl) => {
        const updatedPreviewImages = previewImages.filter(image => image !== imageUrl);
        setPreviewImages(updatedPreviewImages);

        const updatedImages = images.filter(image => URL.createObjectURL(image) !== imageUrl);
        setImages(updatedImages);
    };

    const fetchGroupMessages = async (groupId) => {
        const groupRef = doc(database, 'Groups', groupId);
        const messagesRef = collection(groupRef, 'messages');
        const querySnapshot = await getDocs(messagesRef);

        const groupMessages = [];
        querySnapshot.forEach((doc) => {
            groupMessages.push(doc.data());
        });
        const sortedMessages = groupMessages.sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());
        setMessages(sortedMessages);
    };
    const fetchCommunityMessages = async (groupId) => {
        const groupRef = doc(database, 'Community', groupId);
        const messagesRef = collection(groupRef, 'messages');
        const querySnapshot = await getDocs(messagesRef);

        const groupMessages = [];
        if(!querySnapshot.empty){
            querySnapshot.forEach((doc) => {
                groupMessages.push(doc.data());
            });
            const sortedMessages = groupMessages.sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());
            setCommunityMessages(sortedMessages);
        }
    };
    const handleGroupClick = async (groupId) => {
        setSelectedGroup(groupId);
        setSelectedUser(null);
        setSelectedCommunity(null);
        await fetchGroupMessages(groupId);
    };
 
    const handleCommunityClick = async (groupId) => {
        setSelectedCommunity(groupId);
        setSelectedUser(null);
        setSelectedGroup(null);
        await fetchCommunityMessages(groupId);
    };   
    const requestInRef = collection(database, "Users", auth.currentUser?.uid, "RequestIn");
    const showRequest = async () => {
        try {
            const data = await getDocs(requestInRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            const uniqueUsers = Array.from(new Set(filteredData.map(user => user.id)))
                .map(id => filteredData.find(user => user.id === id));

            setUser(uniqueUsers);
        } catch (err) {
            console.error("Error fetching requests:", err);
        } finally {
            setLoading(false);
        }
    };

    const showMessage = async () => {
        if (!selectedUser) return;
        const userDoc = doc(database, "Users", `${auth.currentUser?.uid}`);
        const messageDoc = doc(userDoc, "Message", `${auth.currentUser?.uid}`);
        const messageRef = collection(messageDoc, `Message-${selectedUser.id}`);
        try {
            const data = await getDocs(messageRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            const sortedMessages = filteredData.sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());

            setMessageData(sortedMessages);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        if (selectedGroup) {
            fetchGroupMessages();
        }
    }, [selectedGroup]);
    useEffect(() => {
        const fetchSenderNames = async () => {
            const names = {};
            for (let message of messages) {
                if (!names[message.senderId]) {
                    const name = await senderName(message.senderId);
                    names[message.senderId] = name;
                }
            }
            setSenderNames(names);
        };

        fetchSenderNames();
    }, [messages, database]);
    useEffect(() => {
        const fetchSenderNames = async () => {
            const names = {};
            for (let message of communityMessages) {
                if (!names[message.senderId]) {
                    const name = await senderName(message.senderId);
                    names[message.senderId] = name;
                }
            }
            setSenderNames(names);
        };

        fetchSenderNames();
    }, [communityMessages, database]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(groups);
    const [defaults, setdefaults]=useState(true);
    const [communitySearchQuery, setCommunitySearchQuery]=useState('');
    const [communityDefaults, setCommunityDefaults]=useState(true);
    const [filteredCommunity, setFilteredCommunity]=useState(communities);
    const handleSearchChange = (event) => {
    setdefaults(false);
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = groups.filter(user => 
        user.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
    };
    const handleCommunitySearchChange = (event) => {
        setCommunityDefaults(false);
        const query = event.target.value;
        setCommunitySearchQuery(query);
        const filtered = communities.filter(user => 
            user.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCommunity(filtered);
        };
    // seperating mobile queries by kesavan 😆
    const [mobilesearchQuery, mobilesetSearchQuery] = useState('');
    const [mobilefilteredUsers, mobilesetFilteredUsers] = useState(user);
    const [mobiledefaults, mobilesetdefaults]=useState(true);
    const mobilehandleSearchChange = (event) => {
        mobilesetdefaults(false);
    const query = event.target.value;
    mobilesetSearchQuery(query);
    const filtered = user.filter(user => 
        user.username.toLowerCase().includes(query.toLowerCase()) || 
        user.role.toLowerCase().includes(query.toLowerCase())
    );
    mobilesetFilteredUsers(filtered);
    };
    const sendMessage = async () => {
        if (!selectedUser || (!message && images.length === 0)) return;

        const imageUrls = await Promise.all(images.map(async (file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.readAsDataURL(file);
            });
        }));
        const userDocSender = doc(database, "Users", `${auth.currentUser?.uid}`);
        const messageDocSender = doc(userDocSender, "Message", `${auth.currentUser?.uid}`);
        const messageRefSender = collection(messageDocSender, `Message-${selectedUser.id}`);

        try {
            await addDoc(messageRefSender, {
                message: message,
                images: imageUrls,
                timestamp: new Date(),
                senderId: auth.currentUser?.uid,
            });

            const userDocReceiver = doc(database, "Users", `${selectedUser.id}`);
            const messageDocReceiver = doc(userDocReceiver, "Message", `${selectedUser.id}`);
            const messageRefReceiver = collection(messageDocReceiver, `Message-${auth.currentUser?.uid}`);

            await addDoc(messageRefReceiver, {
                message: message,
                images: imageUrls,
                timestamp: new Date(),
                senderId: auth.currentUser?.uid,
            });

            setMessage('');
            setImages([]);
            setPreviewImages([]);
            setOpenModal(false);
            showMessage();
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };
    const handleSendMessage = async (groupids) => {
        if (!selectedGroup || (!grpmessage && images.length === 0)) {
            alert('Please enter a message!');
            return;
        };
        const imageUrls = await Promise.all(images.map(async (file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.readAsDataURL(file);
            });
        }));
        const newMessage = {
            senderId: auth.currentUser?.uid,
            username: username,
            message: grpmessage,
            images: imageUrls,
            timestamp: new Date(),
        };
        const groupRef = doc(database, 'Groups', selectedGroup);
        const messagesRef = collection(groupRef, 'messages');
        const newMessageRef = doc(messagesRef, `${Math.random()}`);
        await setDoc(newMessageRef, newMessage);
        await updateDoc(groupRef, {
            lastMessage: newMessage.message,
            lastMessageTimestamp: newMessage.timestamp,
        });
        setImages([]);
        setPreviewImages([]);
        setGrpMessage('');
        setOpenGroupModal(false);
        await fetchGroupMessages(selectedGroup);
    };
    const handleSendCommunityMessage = async (groupids) => {
        if (!selectedCommunity || (!comMessage && images.length === 0)) {
            alert('Please enter a message!');
            return;
        };
        const imageUrls = await Promise.all(images.map(async (file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.readAsDataURL(file);
            });
        }));
        const newMessage = {
            senderId: auth.currentUser?.uid,
            username: username,
            message: comMessage,
            images: imageUrls,
            timestamp: new Date(),
        };
        const groupRef = doc(database, 'Community', selectedCommunity);
        const messagesRef = collection(groupRef, 'messages');
        const newMessageRef = doc(messagesRef, `${Math.random()}`);
        await setDoc(newMessageRef, newMessage);
        await updateDoc(groupRef, {
            lastMessage: newMessage.message,
            lastMessageTimestamp: newMessage.timestamp,
            lastMessageSender: newMessage.username,
        });
        setImages([]);
        setPreviewImages([]);
        setComMessage('');
        setOpenGroupModal(false);
        await fetchCommunityMessages(selectedCommunity);
    };
    useEffect(() => {
        showRequest();
    }, []);
    const senderName = async (userId) => {
        const docRef = doc(database, "Users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().username;
        } else {
            return "Loading...";
        }
    };
    useEffect(() => {
        if (selectedUser) {
            showMessage();
        }
    }, [selectedUser]);

    if (loading) {
        return <Loading />;
    }
    const deleteMessage = async (messageId, selecteduserId) => {
        const userDocSender = doc(database, "Users", `${auth.currentUser?.uid}`);
        const messageDocSender = doc(userDocSender, "Message", `${auth.currentUser?.uid}`);
        const messageRefSender = collection(messageDocSender, `Message-${selecteduserId}`);
        const messageToDeleteSender = doc(messageRefSender, messageId);

        const userDocReceiver = doc(database, "Users", `${selecteduserId}`);
        const messageDocReceiver = doc(userDocReceiver, "Message", `${selecteduserId}`);
        const messageRefReceiver = collection(messageDocReceiver, `Message-${auth.currentUser?.uid}`);
        const messageToDeleteReceiver = doc(messageRefReceiver, messageId);

        try {
            await deleteDoc(messageToDeleteSender);
            await deleteDoc(messageToDeleteReceiver);
        } catch (err) {
            console.error("Error deleting message:", err);
        }
    };
    const connectedUsers = user.filter(user => user.status === 'connected');
    const handleOpen = () => {
        setSelectedUser(null);
        setSelectedGroup(null);
        setIsEditing(true);
    }
    const handleCommunityOpen = () => {
        setSelectedUser(null);
        setSelectedGroup(null);
        setiscommunityEditing(true);
    }
    const handleClose = () => {
        setIsEditing(false);
        setGroupName('');
        setSelectedUser(null);
    }
    const handleCommunityClose = () => {
        setiscommunityEditing(false);
        setCommunityName('');
    }
    const handlenamechange = (e) => {
        setGroupName(e.target.value);
    }
    const handleCommunitynamechange = (e) => {
        setCommunityName(e.target.value);
    }
    const handleSave = async () => {
        if (groupName === '') {
            alert('Kindly Enter a Group Name');
            setGroupName('');
        } else if (groupName.includes(' ')) {
            alert('Invalid Group Name. Group name cannot have spaces, instead try using underscore _');
            setGroupName('');
        } else {
            try {
                const userGroupsRef = collection(database, 'Users', auth.currentUser?.uid, 'Groups');
                const q = query(userGroupsRef, where('groupName', '==', groupName));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    alert(`You have already created a group with the name ${groupName}. Please choose a different name.`);
                    setGroupName('');
                    return;
                }
                if (selectedUsers.length < 2) {
                    alert('Atleast two members are required to create a Group.');
                    return;
                }
                const membersDetails = selectedUsers.map((user) => ({
                    username: user.username,
                    id: user.id,
                    role: user.role,
                }));
                const groupRef = doc(userGroupsRef, `${groupName}-${auth.currentUser?.uid}`);
                await setDoc(groupRef, {
                    createdBy: username,
                    adminId: auth.currentUser?.uid,
                    groupName: groupName,
                    members: membersDetails,
                    timestamp: new Date(),
                });
                const groupsReference = doc(database, 'Groups', `${groupName}-${auth.currentUser?.uid}`);
                await setDoc(groupsReference, {
                    createdBy: username,
                    adminId: auth.currentUser?.uid,
                    groupName: groupName,
                    members: membersDetails,
                    timestamp: new Date(),
                });

                const userPromises = selectedUsers.map(async (user) => {
                    const individualGroupDoc = doc(database, 'Users', `${user.id}`);
                    const indiGroupRef = doc(individualGroupDoc, 'Groups', `${groupName}-${auth.currentUser?.uid}`);
                    await setDoc(indiGroupRef, {
                        createdBy: username,
                        adminId: auth.currentUser?.uid,
                        groupName: groupName,
                        members: membersDetails,
                        timestamp: new Date(),
                    });
                });

                await Promise.all(userPromises);
                setIsEditing(false);
                setGroupName('');
                setSelectedUsers([]);
            } catch (err) {
                console.log(err);
                setIsEditing(false);
                setGroupName('');
                setSelectedUsers([]);
            }
        }

    };
    const handleCommunitySave = async () => {
        if (communityName === '' || communityDescription==='') {
            alert('Kindly Enter a Community Name and description');
            setCommunityName('');
            setcommunityDescription('')
        }else {
            try {
                const userGroupsRef = collection(database, 'Community');
                const q = query(userGroupsRef); 
                const querySnapshot = await getDocs(q);
                const lowerCaseCommunityName = communityName.toLowerCase();
                const duplicate = querySnapshot.docs.some(doc => {
                    const existingCommunityName = doc.data().communityName.toLowerCase();
                    return existingCommunityName === lowerCaseCommunityName;
                });
            
                if (duplicate) {
                    alert(`The name ${communityName} is already taken. Please choose another name.`);
                    setCommunityName('');
                    return;
                }
            
                const groupRef = doc(userGroupsRef, `${communityName}`);
                await setDoc(groupRef, {
                    createdBy: username,
                    adminId: auth.currentUser?.uid,
                    communityName: communityName,
                    communityDescription: communityDescription,
                    timestamp: new Date(),
                });
                setiscommunityEditing(false);
                setCommunityName('');
                setcommunityDescription('');
            }catch (err) {
                console.log(err);
                setiscommunityEditing(false);
                setCommunityName('');
                setcommunityDescription('');
            }
        }

    };
    return (
        <div className='overflow-y-hidden'> {/* added to remove the input box being lifter above in phones */}
            <Navbar />
            {!isMobile && (
                <div className='flex h-[90vh]'>

                    <div style={{
                        width: '25%',
                        borderRight: '1px solid #e0e0e0',
                        overflowY: 'auto',
                        maxHeight: '100vh',
                        backgroundColor: '#f8f9fa',
                        boxShadow: '1px 0 5px rgba(0, 0, 0, 0.05)'
                    }}>
                        <div style={{ padding: '16px', borderBottom: '1px solid #eaeaea' }}>
                            <Button
                                onClick={handleOpen}
                                variant="contained"
                                fullWidth
                                style={{
                                    backgroundColor: '',
                                    color: 'white',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    padding: '10px'
                                }}
                            >
                                Create a Group
                            </Button>
                        </div>
                        <div style={{ padding: '16px', borderBottom: '1px solid #eaeaea' }}>
                            <Button
                                onClick={handleCommunityOpen}
                                variant="contained"
                                fullWidth
                                style={{
                                    backgroundColor: '',
                                    color: 'white',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    padding: '10px'
                                }}
                            >
                                Create a Community
                            </Button>
                        </div>
                        <div style={{ padding: '12px 8px' }}>
                            <h3 className="font-bold pl-2" style={{
                                color: '#424242',
                                marginBottom: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                Groups
                                <span style={{
                                    backgroundColor: '#edf3fc', color: '#787cff',
                                    fontSize: '12px',
                                    padding: '2px 8px',
                                    borderRadius: '12px'
                                }}>
                                    {groups.length}
                                </span>
                            </h3>
                            <div className="flex items-center border border-gray-300 bg-gray-100 rounded-full px-3 py-2">
                                <FiSearch className="text-gray-500" />
                                <input 
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search groups" 
                                    className="w-full ml-2 text-gray-700 outline-none bg-transparent" 
                                />
                            </div>
                            <List>
                                {defaults && (
                                    <>
                                        {groups.map((groupId) => (
                                    <Paper
                                        key={groupId}
                                        style={{
                                            marginBottom: '8px',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            cursor: 'pointer'
                                        }}
                                        elevation={1}
                                    >
                                        <ListItem button onClick={() => handleGroupClick(groupId)} style={{ padding: '8px 12px' }}>
                                            <Avatar style={{ backgroundColor: '#edf3fc', color: '#787cff' }}>
                                                {(groupNames[groupId] || 'G')[0].toUpperCase()}
                                            </Avatar>
                                            <div style={{ marginLeft: '12px', overflow: 'hidden' }}>
                                                <ListItemText
                                                    primary={
                                                        <span style={{ fontWeight: 500, color: '#424242' }}>
                                                            {groupNames[groupId] || 'Loading...'}
                                                        </span>
                                                    }
                                                    secondary={
                                                        <span style={{ fontSize: '12px', color: '#757575' }}>
                                                            {groupLastMessage[groupId]|| 'Loading...'}
                                                        </span>
                                                    }
                                                    primaryTypographyProps={{ noWrap: true }}
                                                    secondaryTypographyProps={{ noWrap: true }}
                                                />
                                            </div>
                                        </ListItem>
                                    </Paper>
                                ))}
                                    </>
                                )}
                                {!defaults && (
                                    <>
                                        {filteredUsers.map((groupId) => (
                                    <Paper
                                        key={groupId}
                                        style={{
                                            marginBottom: '8px',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            cursor: 'pointer'
                                        }}
                                        elevation={1}
                                    >
                                        <ListItem button onClick={() => handleGroupClick(groupId)} style={{ padding: '8px 12px' }}>
                                            <Avatar style={{ backgroundColor: '#edf3fc', color: '#787cff' }}>
                                                {(groupNames[groupId] || 'G')[0].toUpperCase()}
                                            </Avatar>
                                            <div style={{ marginLeft: '12px', overflow: 'hidden' }}>
                                                <ListItemText
                                                    primary={
                                                        <span style={{ fontWeight: 500, color: '#424242' }}>
                                                            {groupNames[groupId] || 'Loading...'}
                                                        </span>
                                                    }
                                                    secondary={
                                                        <span style={{ fontSize: '12px', color: '#757575' }}>
                                                            {groupLastMessage[groupId]|| 'Loading...'}
                                                        </span>
                                                    }
                                                    primaryTypographyProps={{ noWrap: true }}
                                                    secondaryTypographyProps={{ noWrap: true }}
                                                />
                                            </div>
                                        </ListItem>
                                    </Paper>
                                ))}
                                    </>
                                )}
                            </List>
                        </div>

                        <div style={{ padding: '12px 8px' }}>
                            <h3 className='font-bold pl-2' style={{
                                color: '#424242',
                                marginBottom: '10px',
                                marginTop: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                Chats
                                <span style={{
                                    backgroundColor: '#edf3fc', color: '#787cff',
                                    fontSize: '12px',
                                    padding: '2px 8px',
                                    borderRadius: '12px'
                                }}>
                                    {user.filter(user => user.status === 'connected').length}
                                </span>
                            </h3>
                            <div className="flex items-center border border-gray-300 bg-gray-100 rounded-full px-3 py-2">
                                    <FiSearch className="text-gray-500" />
                                    <input 
                                        value={mobilesearchQuery}
                                        onChange={mobilehandleSearchChange}
                                        placeholder="Search chats" 
                                        className="w-full ml-2 text-gray-700 outline-none bg-transparent" 
                                    />
                                </div>
                                <List>
                                    {mobiledefaults && (
                                        user.filter(user => user.status === 'connected').map((eachuser) => (
                                            <Paper 
                                                key={eachuser.id} 
                                                style={{ 
                                                    marginBottom: '8px', 
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                                    cursor: 'pointer'
                                                }}
                                                elevation={1}
                                            >
                                                <ListItem button onClick={() => handleuserselection(eachuser)} style={{ padding: '8px 12px' }}>
                                                    <Avatar 
                                                        src={profilePics[eachuser.id]} 
                                                        sx={{ 
                                                            width: 48, 
                                                            height: 48,
                                                        }}
                                                    />
                                                    <div style={{ marginLeft: '12px', overflow: 'hidden' }}>
                                                        <ListItemText 
                                                            primary={
                                                                <span style={{ fontWeight: 500, color: '#424242' }}>
                                                                    {eachuser.username}
                                                                </span>
                                                            } 
                                                            secondary={
                                                                <span style={{ fontSize: '12px', color: '#757575' }}>
                                                                    {eachuser.role}
                                                                </span>
                                                            }
                                                            primaryTypographyProps={{ noWrap: true }}
                                                            secondaryTypographyProps={{ noWrap: true }}
                                                        />
                                                    </div>
                                                </ListItem>
                                            </Paper>
                                        ))
                                    )}
                                    {!mobiledefaults && (
                                        mobilefilteredUsers.filter(user => user.status === 'connected').map((eachuser) => (
                                            <Paper 
                                                key={eachuser.id} 
                                                style={{ 
                                                    marginBottom: '8px', 
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                                    cursor: 'pointer'
                                                }}
                                                elevation={1}
                                            >
                                                <ListItem button onClick={() => handleuserselection(eachuser)} style={{ padding: '8px 12px' }}>
                                                    <Avatar 
                                                        src={profilePics[eachuser.id]} 
                                                        sx={{ 
                                                            width: 48, 
                                                            height: 48,
                                                        }}
                                                    >
                                                    </Avatar>
                                                    <div style={{ marginLeft: '12px', overflow: 'hidden' }}>
                                                        <ListItemText 
                                                            primary={
                                                                <span style={{ fontWeight: 500, color: '#424242' }}>
                                                                    {eachuser.username}
                                                                </span>
                                                            } 
                                                            secondary={
                                                                <span style={{ fontSize: '12px', color: '#757575' }}>
                                                                    {eachuser.role}
                                                                </span>
                                                            }
                                                            primaryTypographyProps={{ noWrap: true }}
                                                            secondaryTypographyProps={{ noWrap: true }}
                                                        />
                                                    </div>
                                                </ListItem>
                                            </Paper>
                                        ))
                                    )}
                                </List>
                        </div>

                        <div style={{ padding: '12px 8px' }}>
                            <h3 className="font-bold pl-2" style={{
                                color: '#424242',
                                marginBottom: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                Communities
                                <span style={{
                                    backgroundColor: '#edf3fc', color: '#787cff',
                                    fontSize: '12px',
                                    padding: '2px 8px',
                                    borderRadius: '12px'
                                }}>
                                    {communities.length}
                                </span>
                            </h3>
                            <div className="flex items-center border border-gray-300 bg-gray-100 rounded-full px-3 py-2">
                                <FiSearch className="text-gray-500" />
                                <input 
                                    type='text'
                                    value={communitySearchQuery}
                                    onChange={handleCommunitySearchChange}
                                    placeholder="Search groups" 
                                    className="w-full ml-2 text-gray-700 outline-none bg-transparent" 
                                />
                            </div>
                            {communityDefaults && (
                                <List>
                                {communities.map((groupId) => (
                            <Paper
                                key={groupId}
                                style={{
                                    marginBottom: '8px',
                                    borderRadius: '8px',
                                    overflow:'scroll',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    cursor: 'pointer'
                                }}
                                elevation={1}
                            >
                                <ListItem button onClick={() => handleCommunityClick(groupId)} style={{ padding: '8px 12px' }}>
                                    <Avatar style={{ backgroundColor: '#edf3fc', color: '#787cff' }}>
                                        {(communityNames[groupId] || 'G')[0].toUpperCase()}
                                    </Avatar>
                                    <div style={{ marginLeft: '12px', overflow: 'hidden' }}>
                                        <ListItemText
                                            primary={
                                                <span style={{ fontWeight: 500, color: '#424242' }}>
                                                    {communityNames[groupId] || 'Loading...'}
                                                </span>
                                            }
                                            secondary={
                                                <span style={{ fontSize: '12px', color: '#757575' }}>
                                                    {communityLastMessage[groupId]|| 'Loading...'}
                                                </span>
                                            }
                                            primaryTypographyProps={{ noWrap: true }}
                                            secondaryTypographyProps={{ noWrap: true }}
                                        />
                                    </div>
                                </ListItem>
                            </Paper>
                        ))}
                    </List>
                            )}
                            {!communityDefaults && (
                                <List>
                                {filteredCommunity.map((groupId) => (
                            <Paper
                                key={groupId}
                                style={{
                                    marginBottom: '8px',
                                    borderRadius: '8px',
                                    overflow:'scroll',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    cursor: 'pointer'
                                }}
                                elevation={1}
                            >
                                <ListItem button onClick={() => handleCommunityClick(groupId)} style={{ padding: '8px 12px' }}>
                                    <Avatar style={{ backgroundColor: '#edf3fc', color: '#787cff' }}>
                                        {(communityNames[groupId] || 'G')[0].toUpperCase()}
                                    </Avatar>
                                    <div style={{ marginLeft: '12px', overflow: 'hidden' }}>
                                        <ListItemText
                                            primary={
                                                <span style={{ fontWeight: 500, color: '#424242' }}>
                                                    {communityNames[groupId] || 'Loading...'}
                                                </span>
                                            }
                                            secondary={
                                                <span style={{ fontSize: '12px', color: '#757575' }}>
                                                    {communityLastMessage[groupId]|| 'Loading...'}
                                                </span>
                                            }
                                            primaryTypographyProps={{ noWrap: true }}
                                            secondaryTypographyProps={{ noWrap: true }}
                                        />
                                    </div>
                                </ListItem>
                            </Paper>
                        ))}
                    </List>
                            )}
                        </div>
                    </div>


                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                        {isEditing && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
                                    <h1><strong>Create a Group</strong></h1>
                                    <br />
                                    <input type='text' style={{border:'2px solid black', height:'50px', width:'90%', paddingLeft:'10px', marginBottom:'10px'}} placeholder='Group Name' value={groupName} onChange={handlenamechange} />

                                    <Autocomplete
                                        disablePortal
                                        multiple
                                        options={connectedUsers}
                                        getOptionLabel={(option) => option.username}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="members" />}
                                        onChange={(event, value) => setSelectedUsers(value)}
                                        className='mt-4'
                                    />
                                    <div>
                                        <Button onClick={handleClose}>close</Button>
                                        <Button disabled={groupName == ''} onClick={handleSave}>Save</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {isCommunityEditing && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
                                    <h1><strong>Create a Community</strong></h1>
                                    <br />
                                    <input 
                                        type='text' 
                                        style={{
                                            border: '2px solid black', 
                                            height: '50px', 
                                            width: '90%', 
                                            paddingLeft: '10px', 
                                            borderRadius: '8px', 
                                            fontSize: '16px', 
                                            marginBottom: '10px'
                                        }}  
                                        placeholder='Community Name' 
                                        value={communityName} 
                                        onChange={handleCommunitynamechange} 
                                    />

                                    <TextField 
                                        label='Describe the purpose of this community' 
                                        value={communityDescription} 
                                        onChange={(e) => setcommunityDescription(e.target.value)} 
                                        variant="outlined" 
                                        fullWidth 
                                        style={{
                                            borderRadius: '8px', 
                                            fontSize: '16px', 
                                            marginBottom: '10px'
                                        }} 
                                    />

                                    <br />
                                    <div>
                                        <Button onClick={handleCommunityClose}>close</Button>
                                        <Button disabled={communityName == ''} onClick={handleCommunitySave}>Save</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {selectedGroup && (
                            <>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px',
                                    borderBottom: '1px solid #ddd'
                                }}>
                                    <Avatar src={profileicon} />
                                    <div style={{ marginLeft: '10px' }}>
                                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            {groupNames[selectedGroup]}
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flex: 1,
                                    overflowY: 'scroll',
                                    paddingBottom: '80px',
                                    backgroundImage: `url(${chat_bg})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'right',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundAttachment: 'fixed',
                                    height: '100%',
                                    width: '100%',
                                }}>
                                    {messages.map((message, index) => {
                                        const isCurrentUser = message.senderId === auth.currentUser?.uid;
                                        return (
                                            <div key={index} style={{
                                                display: 'flex',
                                                justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                                                marginBottom: '15px',
                                                paddingLeft: '10px',
                                                paddingRight: '10px',
                                            }}>
                                                <div className='mr-2' style={{ fontSize: '10px', color: 'black', marginTop: '5px' }}>
                                                    {new Date(message.timestamp.seconds * 1000).toLocaleDateString()}
                                                    <br />
                                                    {new Date(message.timestamp.seconds * 1000).toLocaleTimeString()}
                                                </div>
                                                <div className='mt-1' style={{
                                                    background: isCurrentUser ? 'linear-gradient(to bottom, #1a0d46, #0b3b7e, #0aa6c1)' : '#FFFFFF', // Gradient background for current user
                                                    color: isCurrentUser ? '#FFFFFF' : '#000',
                                                    padding: '10px',
                                                    borderRadius: '15px',
                                                    maxWidth: '80%',
                                                    display: 'inline-block',
                                                    wordBreak: 'break-word',
                                                    marginLeft: isCurrentUser ? '10px' : '0',
                                                    marginRight: isCurrentUser ? '0' : '10px',
                                                }}>

                                                    <span className='hover:underline cursor-pointer' style={{ fontSize: '15px', fontWeight: 'bolder' }}>{senderNames[message.senderId] || "Loading..."}</span>
                                                    <br />
                                                    {message.images && message.images.map((img, index) => (
                                                        <img
                                                            key={index}
                                                            src={img}
                                                            alt={`Image-${index}`}
                                                            style={{
                                                                width: '100px',
                                                                height: '100px',
                                                                marginTop: '5px',
                                                                borderRadius: '10px',
                                                                display: 'block',
                                                                marginBottom: '5px'
                                                            }}
                                                        />
                                                    ))}
                                                    {message.message && <span style={{ fontSize: '14px', whiteSpace:'pre-line' }}><ReadMore text={message.message} /></span>}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '0',
                                    width: '100%',
                                    padding: '10px',
                                    backgroundColor: '#fff',
                                    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    height:'10%'
                                }}>
                                    <div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                            multiple
                                        />
                                        <BiImageAdd
                                            className='cursor-pointer text-3xl ml-3 mt-1 hover:bg-gray-200 rounded'
                                            onClick={() => {
                                                setOpenGroupModal(true);
                                            }} />
                                    </div>
                                    <TextField
                                        value={grpmessage}
                                        className=' border pl-5 pb-1'
                                        onChange={(e) => setGrpMessage(e.target.value)}
                                        placeholder="Type a message"
                                        style={{
                                            width: '85%',
                                            marginRight: '10px',
                                            
                                        }}
                                    />
                                    <button
                                        onClick={() => handleSendMessage(selectedGroup)}
                                        variant="contained"
                                        className="postButton text-white font-bold px-3 py-1 rounded mr-4"
                                        style={{ background: 'linear-gradient(to bottom, #1a0d46, #0b3b7e, #0aa6c1)' }}
                                    >
                                        Send
                                    </button>
                                </div>
                            </>
                        )}
                        {selectedUser && (
                            <>
                                <Link to={`/otherprofile/${selectedUser.id}`}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px',
                                        borderBottom: '1px solid #ddd'
                                    }}>
                                        <Avatar 
                                            src={profilePics[selectedUser.id]} 
                                            sx={{ 
                                                width: 48, 
                                                height: 48,
                                            }}
                                        />
                                        <div style={{ marginLeft: '10px' }}>
                                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                                {selectedUser.username}
                                            </div>
                                            <div style={{ fontSize: '14px', color: '#888' }}>
                                                {selectedUser.role}
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flex: 1,
                                    overflowY: 'scroll',
                                    paddingBottom: '80px',
                                    backgroundImage: `url(${chat_bg})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'right',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundAttachment: 'fixed',
                                    height: '100%',
                                    width: '100%',
                                }}>
                                    {messageData.map((userMessage, index) => {
                                        const isCurrentUser = userMessage.senderId === auth.currentUser?.uid;
                                        return (
                                            <div
                                                onMouseEnter={() => setView(userMessage.id)}
                                                onMouseLeave={() => setView(null)}
                                                key={index} style={{
                                                    display: 'flex',
                                                    justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                                                    marginBottom: '15px',
                                                    paddingLeft: '10px',
                                                    paddingRight: '10px',
                                                }}>
                                                <div className='mr-2' style={{ fontSize: '10px', color: 'black', marginTop: '5px' }}>
                                                    {new Date(userMessage.timestamp.seconds * 1000).toLocaleDateString()}
                                                    <br />
                                                    {new Date(userMessage.timestamp.seconds * 1000).toLocaleTimeString()}
                                                </div>
                                                <div className='mt-1' style={{
                                                    background: isCurrentUser ? 'linear-gradient(to bottom, #210cae, #4dc9e6)' : 'white', // Gradient background for current user
                                                    color: isCurrentUser ? '#FFFFFF' : '#000',
                                                    padding: '10px',
                                                    borderRadius: '15px',
                                                    maxWidth: '80%',
                                                    display: 'inline-block',
                                                    wordBreak: 'break-word',
                                                    marginLeft: isCurrentUser ? '10px' : '0',
                                                    marginRight: isCurrentUser ? '0' : '10px',
                                                }}>
                                                    {userMessage.images && userMessage.images.map((img, index) => (
                                                        <img
                                                            key={index}
                                                            src={img}
                                                            alt={`Image-${index}`}
                                                            style={{
                                                                width: '100px',
                                                                height: '100px',
                                                                marginTop: '5px',
                                                                borderRadius: '10px',
                                                                display: 'block',
                                                                marginBottom: '5px'
                                                            }}
                                                        />
                                                    ))}
                                                    {userMessage.message && <span style={{ fontSize: '14px', whiteSpace:'pre-line' }}><ReadMore text={userMessage.message} /></span>}
                                                </div>
                                                {isCurrentUser && view === userMessage.id && (
                                                    <button
                                                        onClick={() => {
                                                            deleteMessage(userMessage.id, selectedUser.id)
                                                            alert('The message is deleted only for you!');
                                                            showMessage();
                                                        }}
                                                        style={{
                                                            cursor: 'pointer',
                                                            background: 'transparent',
                                                            border: 'none',
                                                            marginTop: '5px',
                                                            marginLeft: '5px',
                                                            fontSize: '16px',
                                                            color: 'red'
                                                        }}
                                                    >
                                                        <img src={deleteIcon} className='w-5 h-5' alt="❌" />
                                                    </button>
                                                )}
                                                {isCurrentUser && (
                                                    <button className='md:hidden block'
                                                        onClick={() => {
                                                            deleteMessage(userMessage.id, selectedUser.id)
                                                            alert('The message is deleted only for you!');
                                                            showMessage();
                                                        }}
                                                        style={{
                                                            cursor: 'pointer',
                                                            background: 'transparent',
                                                            border: 'none',
                                                            marginTop: '5px',
                                                            marginLeft: '5px',
                                                            fontSize: '16px',
                                                            color: 'red'
                                                        }}
                                                    >
                                                        <img src={deleteIcon} className='w-5 h-5' alt="❌" />
                                                    </button>
                                                )}
                                                {!isCurrentUser && isMobile &&(
                                                    <button className='block'
                                                        onClick={() => {
                                                            deleteMessage(userMessage.id, selectedUser.id)
                                                            alert('The message is deleted only for you!');
                                                            showMessage();
                                                        }}
                                                        style={{
                                                            cursor: 'pointer',
                                                            background: 'transparent',
                                                            border: 'none',
                                                            marginTop: '5px',
                                                            marginLeft: '5px',
                                                            fontSize: '16px',
                                                            color: 'red'
                                                        }}
                                                    >
                                                        <img src={deleteIcon} className='w-5 h-5' alt="❌" />
                                                    </button>
                                                )}
                                                {!isCurrentUser && view === userMessage.id && (
                                                    <button
                                                        onClick={() => {
                                                            deleteMessage(userMessage.id, selectedUser.id)
                                                            alert('The message is deleted only for you!');
                                                            showMessage();
                                                        }}
                                                        style={{
                                                            cursor: 'pointer',
                                                            background: 'transparent',
                                                            border: 'none',
                                                            marginTop: '5px',
                                                            marginLeft: '5px',
                                                            fontSize: '16px',
                                                            color: 'red'
                                                        }}
                                                    >
                                                        <img src={deleteIcon} className='w-5 h-5' alt="❌" />
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#fff',
                                boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height:'10%'
                            }}>
                                <div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        multiple
                                    />
                                    <BiImageAdd
                                        className='cursor-pointer text-3xl mt-1 hover:bg-gray-200 rounded mr-2'
                                        onClick={() => {
                                            setOpenModal(true);
                                        }} />
                                </div>
                                <TextField
                                        multiline
                                        value={message}
                                        className=' border pl-5'
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type a message"
                                        style={{
                                            width: '85%',
                                            marginRight: '10px',
                                        }}
                                    />
                                <RiMoneyRupeeCircleLine onClick={() => handlenavigation(selectedUser.id)} className='text-5xl mx-3 cursor-pointer hover:bg-gray-200 rounded' />
                                <Button
                                    onClick={sendMessage}
                                    variant="contained" className="postButton bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500 "
                                >
                                    Send
                                </Button>
                            </div>
                            </>
                        )}
                        {selectedCommunity && (
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px',
                                    borderBottom: '1px solid #ddd'
                                }}>
                                    <Avatar src={profileicon} />
                                    <div style={{ marginLeft: '10px' }}>
                                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            {communityNames[selectedCommunity]}
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flex: 1,
                                    overflowY: 'auto',
                                    backgroundImage: `url(${chat_bg})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'right',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundAttachment: 'fixed',
                                    padding: '10px',
                                    paddingBottom:'130px',
                                    marginBottom: '10px' // Make room for the input area
                                }}>
                                    {communityMessages.map((message, index) => {
                                        const isCurrentUser = message.senderId === auth.currentUser?.uid;
                                        return (
                                            <div key={index} style={{
                                                display: 'flex',
                                                justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                                                marginBottom: '15px',
                                                paddingLeft: '10px',
                                                paddingRight: '10px',
                                            }}>
                                                <div className='mr-2' style={{ fontSize: '10px', color: 'black', marginTop: '5px' }}>
                                                    {new Date(message.timestamp.seconds * 1000).toLocaleDateString()}
                                                    <br />
                                                    {new Date(message.timestamp.seconds * 1000).toLocaleTimeString()}
                                                </div>
                                                <div className='mt-1' style={{
                                                    background: isCurrentUser ? 'linear-gradient(to bottom, #1a0d46, #0b3b7e, #0aa6c1)' : '#FFFFFF',
                                                    color: isCurrentUser ? '#FFFFFF' : '#000',
                                                    padding: '10px',
                                                    borderRadius: '15px',
                                                    maxWidth: '80%',
                                                    display: 'inline-block',
                                                    wordBreak: 'break-word',
                                                    marginLeft: isCurrentUser ? '10px' : '0',
                                                    marginRight: isCurrentUser ? '0' : '10px',
                                                }}>
                                                    <Link to={`/otherprofile/${message.senderId}`}><span className='hover:underline cursor-pointer' style={{ fontSize: '15px', fontWeight: 'bolder' }}>{senderNames[message.senderId] || "Loading..."}</span></Link>
                                                    <br />
                                                    {message.images && message.images.map((img, index) => (
                                                        <img
                                                            key={index}
                                                            src={img}
                                                            alt={`Image-${index}`}
                                                            style={{
                                                                width: '100px',
                                                                height: '100px',
                                                                marginTop: '5px',
                                                                borderRadius: '10px',
                                                                display: 'block',
                                                                marginBottom: '5px'
                                                            }}
                                                        />
                                                    ))}
                                                    {message.message && <span style={{ fontSize: '14px', whiteSpace:'pre-line' }}><ReadMore text={message.message}/></span>}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '0',
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: '#fff',
                                    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    height:'10%'
                                }}>
                                    <div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                            multiple
                                        />

                                        <BiImageAdd
                                            className='cursor-pointer text-3xl mt-1 hover:bg-gray-200 rounded mr-2'
                                            onClick={() => {
                                                setOpenCommunityModal(true);
                                            }} 
                                        />
                                    </div>
                                    <TextField
                                        multiline
                                        value={comMessage}
                                        className=' border pl-5'
                                        onChange={(e) => setComMessage(e.target.value)}
                                        placeholder="Type a message"
                                        style={{
                                            width: '85%',
                                            marginRight: '10px',
                                        }}
                                    />
                                    <Button
                                        onClick={() => handleSendCommunityMessage(selectedCommunity)}
                                        variant="contained"
                                        className="postButton bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500"
                                    >
                                        Send
                                    </Button>
                                </div>
                            </div>
                        )}
                        {!selectedUser && !selectedGroup && !selectedCommunity && (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100vh'
                            }}>
                                <div style={{
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}>
                                    <img src={logo} style={{ height: '200px', width: '200px', borderRadius: '50%', alignSelf: 'center' }} />
                                    <div className='russo ' style={{
                                        background: 'linear-gradient(to bottom, #1e3a8a, #1d4ed8, #22d3ee)',
                                        WebkitBackgroundClip: 'text',
                                        color: 'transparent',
                                        fontSize: '4rem',
                                        fontWeight: 'bold',
                                    }}>
                                        KOTINOS
                                    </div>
                                    <h1 className='' style={{ fontSize: '2rem', color: 'black', fontWeight: 'bold' }}>Your Dream, Our Platform</h1>
                                    <h1 className='text-gray-400'>Select a chat to start your conversation</h1>
                                </div>
                            </div>


                        )}
                    </div>

                    <Modal
                        open={openModal}
                        onClose={() => handleuserclosemodal}
                    >
                        <Box sx={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: 24,
                            width: 400, textAlign: 'center'
                        }}>
                            <h3>Choose Images (Max 3)</h3>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                multiple
                            />
                            <Button onClick={handleImageClick}>Choose Files</Button>
                            <div style={{ marginTop: '10px' }}>
                                {previewImages.map((imageUrl, index) => (
                                    <div key={index} style={{ marginBottom: '10px' }} className=' bg-blue-50 p-2 w-fit rounded-xl'>
                                        <img src={imageUrl} alt={`Preview-${index}`} style={{ width: '100px', height: '100px', margin: '0 10px' }} />
                                        <Button onClick={() => handleDeletePreviewImage(imageUrl)} className='' style={{ color: 'red' }}>
                                            <img src={deleteIcon} className='' alt="Delete" style={{ width: '20px' }} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <TextField
                                multiline
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                label="Add a Descreption"
                                className=''
                                style={{
                                    width: '85%',
                                    marginRight: '10px',
                                }}
                            />
                            <Button
                                onClick={()=>handleuserclosemodal()}
                                className='bg-gradient-to-r from-blue-900/80 via-blue-700/80 to-cyan-500/80'
                                style={{
                                    marginRight:'5px',
                                    color: '#fff',
                                    padding: '12px 24px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginTop: '20px',
                                }}
                            >
                                Close
                            </Button>
                            <Button
                                onClick={sendMessage}
                                className='bg-gradient-to-r from-blue-900/80 via-blue-700/80 to-cyan-500/80'
                                style={{

                                    color: '#fff',
                                    padding: '12px 24px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginTop: '20px',
                                }}
                            >
                                Send
                            </Button>
                        </Box>
                    </Modal>
                    <Modal
                        open={openGroupModal}
                        onClose={() => handlegroupclosemodal}
                    >
                        <Box sx={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: 24,
                            width: 400, textAlign: 'center'
                        }}>
                            <h3>Choose Images (Max 3)</h3>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                multiple
                            />
                            <Button onClick={handleImageClick}>Choose Files</Button>
                            <div style={{ marginTop: '10px' }}>
                                {previewImages.map((imageUrl, index) => (
                                    <div key={index} style={{ marginBottom: '10px' }} className=' bg-blue-50 p-2 w-fit rounded-xl'>
                                        <img src={imageUrl} alt={`Preview-${index}`} style={{ width: '100px', height: '100px', margin: '0 10px' }} />
                                        <Button onClick={() => handleDeletePreviewImage(imageUrl)} className='' style={{ color: 'red' }}>
                                            <img src={deleteIcon} className='' alt="Delete" style={{ width: '20px' }} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <TextField
                                multiline
                                value={grpmessage}
                                onChange={(e) => setGrpMessage(e.target.value)}
                                label="Add a Descreption"
                                className=''
                                style={{
                                    width: '85%',
                                    marginRight: '10px',
                                }}
                            />
                            <Button
                                onClick={()=>handlegroupclosemodal()}
                                className='bg-gradient-to-r from-blue-900/80 via-blue-700/80 to-cyan-500/80'
                                style={{
                                    marginRight:'5px',
                                    color: '#fff',
                                    padding: '12px 24px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginTop: '20px',
                                }}
                            >
                                Close
                            </Button>
                            <Button
                                onClick={()=>handleSendMessage()}
                                className='bg-gradient-to-r from-blue-900/80 via-blue-700/80 to-cyan-500/80'
                                style={{

                                    color: '#fff',
                                    padding: '12px 24px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginTop: '20px',
                                }}
                            >
                                Send
                            </Button>
                        </Box>
                    </Modal>
                    <Modal
                        open={openCommunityModal}
                        onClose={() => handlecommunityclosemodal}
                    >
                        <Box sx={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: 24,
                            width: 400, textAlign: 'center'
                        }}>
                            <h3>Choose Images (Max 3)</h3>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                multiple
                            />
                            <Button onClick={handleImageClick}>Choose Files</Button>
                            <div style={{ marginTop: '10px' }}>
                                {previewImages.map((imageUrl, index) => (
                                    <div key={index} style={{ marginBottom: '10px' }} className=' bg-blue-50 p-2 w-fit rounded-xl'>
                                        <img src={imageUrl} alt={`Preview-${index}`} style={{ width: '100px', height: '100px', margin: '0 10px' }} />
                                        <Button onClick={() => handleDeletePreviewImage(imageUrl)} className='' style={{ color: 'red' }}>
                                            <img src={deleteIcon} className='' alt="Delete" style={{ width: '20px' }} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <TextField
                                multiline
                                value={comMessage}
                                onChange={(e) => setGrpMessage(e.target.value)}
                                label="Add a Descreption"
                                className=''
                                style={{
                                    width: '85%',
                                    marginRight: '10px',
                                }}
                            />
                            <Button
                                onClick={()=>handlecommunityclosemodal()}
                                className='bg-gradient-to-r from-blue-900/80 via-blue-700/80 to-cyan-500/80'
                                style={{
                                    marginRight:'5px',
                                    color: '#fff',
                                    padding: '12px 24px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginTop: '20px',
                                }}
                            >
                                Close
                            </Button>
                            <Button
                                onClick={()=>handleSendCommunityMessage()}
                                className='bg-gradient-to-r from-blue-900/80 via-blue-700/80 to-cyan-500/80'
                                style={{

                                    color: '#fff',
                                    padding: '12px 24px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginTop: '20px',
                                }}
                            >
                                Send
                            </Button>
                        </Box>
                    </Modal>
                </div>
            )}
            {isMobile && (
                <div className='flex h-[90vh]'>

                    {(!selectedGroup && !selectedUser && !selectedCommunity) && (
                        <div style={{ 
                            overflowY: 'auto', 
                            maxHeight: '100vh', 
                            width: '100%',
                            backgroundColor: '#f8f9fa',
                            padding: '8px'
                        }}>
                            <div style={{ padding: '12px 8px', borderBottom: '1px solid #eaeaea', marginBottom: '16px' }}>
                                <Button 
                                    onClick={handleOpen}
                                    variant="contained"
                                    fullWidth
                                    style={{ 
                                        backgroundColor: '', 
                                        color: 'white',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        borderRadius: '8px',
                                        padding: '10px'
                                    }}
                                >
                                    Create a Group
                                </Button>
                            </div>
                            <div style={{ padding: '12px 8px', borderBottom: '1px solid #eaeaea', marginBottom: '16px' }}>
                                <Button 
                                    onClick={handleCommunityOpen}
                                    variant="contained"
                                    fullWidth
                                    style={{ 
                                        backgroundColor: '', 
                                        color: 'white',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        borderRadius: '8px',
                                        padding: '10px'
                                    }}
                                >
                                    Create a Community
                                </Button>
                            </div>
                            <div style={{ padding: '4px 8px' }}>
                                <h3 className="font-bold pl-2" style={{ 
                                    color: '#424242', 
                                    marginBottom: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    Groups
                                    <span style={{ 
                                        backgroundColor: '#edf3fc', 
                                        color: '#787cff', 
                                        fontSize: '12px', 
                                        padding: '2px 8px', 
                                        borderRadius: '12px'
                                    }}>
                                        {groups.length}
                                    </span>
                                </h3>
                                <div className="flex items-center border border-gray-300 bg-gray-100 rounded-full px-3 py-2">
                                    <FiSearch className="text-gray-500" />
                                    <input 
                                        type="text" 
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        placeholder="Search groups" 
                                        className="w-full ml-2 text-gray-700 outline-none bg-transparent" 
                                    />
                                </div>
                                <List>
                                    {defaults && (
                                        <>
                                            {groups.map((groupId) => (
                                                <Paper 
                                                    key={groupId} 
                                                    style={{ 
                                                        marginBottom: '8px', 
                                                        borderRadius: '8px',
                                                        overflow: 'hidden',
                                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                                        cursor: 'pointer'
                                                    }}
                                                    elevation={1}
                                                >
                                                    <ListItem button onClick={() => handleGroupClick(groupId)} style={{ padding: '8px 12px' }}>
                                                        <Avatar style={{ backgroundColor: '#edf3fc', color: '#787cff' }}>
                                                            {(groupNames[groupId] || 'G')[0].toUpperCase()}
                                                        </Avatar>
                                                        <div style={{ marginLeft: '12px', overflow: 'hidden' }}>
                                                            <ListItemText 
                                                                primary={
                                                                    <span style={{ fontWeight: 500, color: '#424242' }}>
                                                                        {groupNames[groupId] || 'Loading...'}
                                                                    </span>
                                                                } 
                                                                secondary={
                                                                    <span style={{ fontSize: '12px', color: '#757575' }}>
                                                                        {groupLastMessage[groupId]|| 'Loading...'}
                                                                    </span>
                                                                }
                                                                primaryTypographyProps={{ noWrap: true }}
                                                                secondaryTypographyProps={{ noWrap: true }}
                                                            />
                                                        </div>
                                                    </ListItem>
                                                </Paper>
                                            ))}
                                        </>
                                    )}
                                    {!defaults && (
                                        <>
                                            {filteredUsers.map((groupId) => (
                                        <Paper 
                                            key={groupId} 
                                            style={{ 
                                                marginBottom: '8px', 
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                transition: 'transform 0.2s, box-shadow 0.2s',
                                                cursor: 'pointer'
                                            }}
                                            elevation={1}
                                        >
                                            <ListItem button onClick={() => handleGroupClick(groupId)} style={{ padding: '8px 12px' }}>
                                                <Avatar style={{ backgroundColor: '#edf3fc', color: '#787cff' }}>
                                                    {(groupNames[groupId] || 'G')[0].toUpperCase()}
                                                </Avatar>
                                                <div style={{ marginLeft: '12px', overflow: 'hidden' }}>
                                                    <ListItemText 
                                                        primary={
                                                            <span style={{ fontWeight: 500, color: '#424242' }}>
                                                                {groupNames[groupId] || 'Loading...'}
                                                            </span>
                                                        } 
                                                        secondary={
                                                            <span style={{ fontSize: '12px', color: '#757575' }}>
                                                                {groupLastMessage[groupId]|| 'Loading...'}
                                                            </span>
                                                        }
                                                        primaryTypographyProps={{ noWrap: true }}
                                                        secondaryTypographyProps={{ noWrap: true }}
                                                    />
                                                </div>
                                            </ListItem>
                                        </Paper>
                                    ))}
                                        </>
                                    )}
                                </List>
                            </div>
                            
                            <div style={{ padding: '4px 8px' }}>
                                <h3 className='font-bold pl-2' style={{ 
                                    color: '#424242', 
                                    marginBottom: '10px',
                                    marginTop: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    Chats
                                    <span style={{ 
                                        backgroundColor: '#edf3fc', color: '#787cff', 
                                        fontSize: '12px', 
                                        padding: '2px 8px', 
                                        borderRadius: '12px'
                                    }}>
                                        {user.filter(user => user.status === 'connected').length}
                                    </span>
                                </h3>
                                <div className="flex items-center border border-gray-300 bg-gray-100 rounded-full px-3 py-2">
                                    <FiSearch className="text-gray-500" />
                                    <input 
                                        type="text" 
                                        value={mobilesearchQuery}
                                        onChange={mobilehandleSearchChange}
                                        placeholder="Search chats" 
                                        className="w-full ml-2 text-gray-700 outline-none bg-transparent" 
                                    />
                                </div>
                                <List>
                                    {mobiledefaults && (
                                        user.filter(user => user.status === 'connected').map((eachuser) => (
                                            <Paper 
                                                key={eachuser.id} 
                                                style={{ 
                                                    marginBottom: '8px', 
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                                    cursor: 'pointer'
                                                }}
                                                elevation={1}
                                            >
                                                <ListItem button onClick={() => handleuserselection(eachuser)} style={{ padding: '8px 12px' }}>
                                                    <Avatar 
                                                        src={profilePics[eachuser.id]} 
                                                        sx={{ 
                                                            width: 48, 
                                                            height: 48,
                                                        }}
                                                    >
                                                    </Avatar>
                                                    <div style={{ marginLeft: '12px', overflow: 'hidden' }}>
                                                        <ListItemText 
                                                            primary={
                                                                <span style={{ fontWeight: 500, color: '#424242' }}>
                                                                    {eachuser.username}
                                                                </span>
                                                            } 
                                                            secondary={
                                                                <span style={{ fontSize: '12px', color: '#757575' }}>
                                                                    {eachuser.role}
                                                                </span>
                                                            }
                                                            primaryTypographyProps={{ noWrap: true }}
                                                            secondaryTypographyProps={{ noWrap: true }}
                                                        />
                                                    </div>
                                                </ListItem>
                                            </Paper>
                                        ))
                                    )}
                                    {!mobiledefaults && (
                                        mobilefilteredUsers.filter(user => user.status === 'connected').map((eachuser) => (
                                            <Paper 
                                                key={eachuser.id} 
                                                style={{ 
                                                    marginBottom: '8px', 
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                                    cursor: 'pointer'
                                                }}
                                                elevation={1}
                                            >
                                                <ListItem button onClick={() => handleuserselection(eachuser)} style={{ padding: '8px 12px' }}>
                                                    <Avatar 
                                                        src={profilePics[eachuser.id]} 
                                                        sx={{ 
                                                            width: 48, 
                                                            height: 48,
                                                        }}
                                                    >
                                                    </Avatar>
                                                    <div style={{ marginLeft: '12px', overflow: 'hidden' }}>
                                                        <ListItemText 
                                                            primary={
                                                                <span style={{ fontWeight: 500, color: '#424242' }}>
                                                                    {eachuser.username}
                                                                </span>
                                                            } 
                                                            secondary={
                                                                <span style={{ fontSize: '12px', color: '#757575' }}>
                                                                    {eachuser.role}
                                                                </span>
                                                            }
                                                            primaryTypographyProps={{ noWrap: true }}
                                                            secondaryTypographyProps={{ noWrap: true }}
                                                        />
                                                    </div>
                                                </ListItem>
                                            </Paper>
                                        ))
                                    )}
                                </List>
                            </div>
                            <div style={{ padding: '12px 8px' }}>
                            <h3 className="font-bold pl-2" style={{
                                color: '#424242',
                                marginBottom: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                Communities
                                <span style={{
                                    backgroundColor: '#edf3fc', color: '#787cff',
                                    fontSize: '12px',
                                    padding: '2px 8px',
                                    borderRadius: '12px'
                                }}>
                                    {communities.length}
                                </span>
                            </h3>
                            <div className="flex items-center border border-gray-300 bg-gray-100 rounded-full px-3 py-2">
                                <FiSearch className="text-gray-500" />
                                <input 
                                    type='text'
                                    value={communitySearchQuery}
                                    onChange={handleCommunitySearchChange}
                                    placeholder="Search groups" 
                                    className="w-full ml-2 text-gray-700 outline-none bg-transparent" 
                                />
                            </div>
                            {communityDefaults && (
                                <List>
                                {communities.map((groupId) => (
                            <Paper
                                key={groupId}
                                style={{
                                    marginBottom: '8px',
                                    borderRadius: '8px',
                                    overflow:'scroll',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    cursor: 'pointer'
                                }}
                                elevation={1}
                            >
                                <ListItem button onClick={() => handleCommunityClick(groupId)} style={{ padding: '8px 12px' }}>
                                    <Avatar style={{ backgroundColor: '#edf3fc', color: '#787cff' }}>
                                        {(communityNames[groupId] || 'G')[0].toUpperCase()}
                                    </Avatar>
                                    <div style={{ marginLeft: '12px', overflow: 'hidden' }}>
                                        <ListItemText
                                            primary={
                                                <span style={{ fontWeight: 500, color: '#424242' }}>
                                                    {communityNames[groupId] || 'Loading...'}
                                                </span>
                                            }
                                            secondary={
                                                <span style={{ fontSize: '12px', color: '#757575' }}>
                                                    {communityLastMessage[groupId]|| 'Loading...'}
                                                </span>
                                            }
                                            primaryTypographyProps={{ noWrap: true }}
                                            secondaryTypographyProps={{ noWrap: true }}
                                        />
                                    </div>
                                </ListItem>
                            </Paper>
                        ))}
                    </List>
                            )}
                            {!communityDefaults && (
                                <List>
                                {filteredCommunity.map((groupId) => (
                            <Paper
                                key={groupId}
                                style={{
                                    marginBottom: '8px',
                                    borderRadius: '8px',
                                    overflow:'scroll',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    cursor: 'pointer'
                                }}
                                elevation={1}
                            >
                                <ListItem button onClick={() => handleCommunityClick(groupId)} style={{ padding: '8px 12px' }}>
                                    <Avatar style={{ backgroundColor: '#edf3fc', color: '#787cff' }}>
                                        {(communityNames[groupId] || 'G')[0].toUpperCase()}
                                    </Avatar>
                                    <div style={{ marginLeft: '12px', overflow: 'hidden' }}>
                                        <ListItemText
                                            primary={
                                                <span style={{ fontWeight: 500, color: '#424242' }}>
                                                    {communityNames[groupId] || 'Loading...'}
                                                </span>
                                            }
                                            secondary={
                                                <span style={{ fontSize: '12px', color: '#757575' }}>
                                                    {communityLastMessage[groupId]|| 'Loading...'}
                                                </span>
                                            }
                                            primaryTypographyProps={{ noWrap: true }}
                                            secondaryTypographyProps={{ noWrap: true }}
                                        />
                                    </div>
                                </ListItem>
                            </Paper>
                        ))}
                    </List>
                            )}
                        </div>
                        </div>

                    )}
                    {selectedGroup && (
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px',
                                borderBottom: '1px solid #ddd'
                            }}>
                                <ArrowLeft onClick={() => setSelectedGroup(null)} />
                                <Avatar src={profileicon} />
                                <div style={{ marginLeft: '10px' }}>
                                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                        {groupNames[selectedGroup]}
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                                overflowY: 'scroll',
                                paddingBottom: '80px',
                                backgroundImage: `url(${chat_bg})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'right',
                                backgroundRepeat: 'no-repeat',
                                backgroundAttachment: 'fixed',
                                height: '100%',
                                width: '100%',
                            }}>
                                {messages.map((message, index) => {
                                    const isCurrentUser = message.senderId === auth.currentUser?.uid;
                                    return (
                                        <div key={index} style={{
                                            display: 'flex',
                                            justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                                            marginBottom: '15px',
                                            paddingLeft: '10px',
                                            paddingRight: '10px',
                                        }}>
                                            <div className='mr-2' style={{ fontSize: '10px', color: 'black', marginTop: '5px' }}>
                                                {new Date(message.timestamp.seconds * 1000).toLocaleDateString()}
                                                <br />
                                                {new Date(message.timestamp.seconds * 1000).toLocaleTimeString()}
                                            </div>
                                            <div className='mt-1' style={{
                                                background: isCurrentUser ? 'linear-gradient(to bottom, #1a0d46, #0b3b7e, #0aa6c1)' : '#FFFFFF', // Gradient background for current user
                                                color: isCurrentUser ? '#FFFFFF' : '#000',
                                                padding: '10px',
                                                borderRadius: '15px',
                                                maxWidth: '80%',
                                                display: 'inline-block',
                                                wordBreak: 'break-word',
                                                marginLeft: isCurrentUser ? '10px' : '0',
                                                marginRight: isCurrentUser ? '0' : '10px',
                                            }}>

                                                <span className='hover:underline cursor-pointer' style={{ fontSize: '15px', fontWeight: 'bolder' }}>{senderNames[message.senderId] || "Loading..."}</span>
                                                <br />
                                                {message.images && message.images.map((img, index) => (
                                                    <img
                                                        key={index}
                                                        src={img}
                                                        alt={`Image-${index}`}
                                                        style={{
                                                            width: '100px',
                                                            height: '100px',
                                                            marginTop: '5px',
                                                            borderRadius: '10px',
                                                            display: 'block',
                                                            marginBottom: '5px'
                                                        }}
                                                    />
                                                ))}
                                                {message.message && <span style={{ fontSize: '14px', whiteSpace:'pre-line' }}><ReadMore text={message.message} /></span>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#fff',
                                boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height:'10%'
                            }}>
                                <div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        multiple
                                    />

                                    <BiImageAdd
                                        className='cursor-pointer text-3xl mt-1 hover:bg-gray-200 rounded mr-2'
                                        onClick={() => {
                                            setOpenGroupModal(true);
                                        }} />
                                </div>
                                <TextField
                                        multiline
                                        value={comMessage}
                                        className=' border pl-5'
                                        onChange={(e) => setComMessage(e.target.value)}
                                        placeholder="Type a message"
                                        style={{
                                            width: '85%',
                                            marginRight: '10px',
                                        }}
                                    />
                                <Button
                                    onClick={() => handleSendMessage(selectedGroup)}
                                    variant="contained"
                                    className="postButton bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500"
                                >
                                    Send
                                </Button>
                            </div>
                        </ div>
                    )}
                    {selectedUser && (
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <ArrowLeft onClick={() => setSelectedUser(null)} />
                                <Link to={`/otherprofile/${selectedUser.id}`}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px',
                                        borderBottom: '1px solid #ddd'
                                    }}>
                                        <Avatar
                                         src={profilePics[selectedUser.id]} 
                                         sx={{ 
                                             width: 48, 
                                             height: 48,
                                         }}
                                         />
                                        <div style={{ marginLeft: '10px' }}>
                                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                                {selectedUser.username}
                                            </div>
                                            <div style={{ fontSize: '14px', color: '#888' }}>
                                                {selectedUser.role}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                                overflowY: 'scroll',
                                paddingBottom: '80px',
                                backgroundImage: `url(${chat_bg})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'right',
                                backgroundRepeat: 'no-repeat',
                                backgroundAttachment: 'fixed',
                                height: '100%',
                                width: '100%',
                            }}>
                                {messageData.map((userMessage, index) => {
                                    const isCurrentUser = userMessage.senderId === auth.currentUser?.uid;
                                    return (
                                        <div
                                            onMouseEnter={() => setView(userMessage.id)}
                                            onMouseLeave={() => setView(null)}
                                            key={index} style={{
                                                display: 'flex',
                                                justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                                                marginBottom: '15px',
                                                paddingLeft: '10px',
                                                paddingRight: '10px',
                                            }}>
                                            <div className='mr-2' style={{ fontSize: '10px', color: 'black', marginTop: '5px' }}>
                                                {new Date(userMessage.timestamp.seconds * 1000).toLocaleDateString()}
                                                <br />
                                                {new Date(userMessage.timestamp.seconds * 1000).toLocaleTimeString()}
                                            </div>
                                            <div className='mt-1' style={{
                                                background: isCurrentUser ? 'linear-gradient(to bottom, #210cae, #4dc9e6)' : 'white', // Gradient background for current user
                                                color: isCurrentUser ? '#FFFFFF' : '#000',
                                                padding: '10px',
                                                borderRadius: '15px',
                                                maxWidth: '80%',
                                                display: 'inline-block',
                                                wordBreak: 'break-word',
                                                marginLeft: isCurrentUser ? '10px' : '0',
                                                marginRight: isCurrentUser ? '0' : '10px',
                                            }}>
                                                {userMessage.images && userMessage.images.map((img, index) => (
                                                    <img
                                                        key={index}
                                                        src={img}
                                                        alt={`Image-${index}`}
                                                        style={{
                                                            width: '100px',
                                                            height: '100px',
                                                            marginTop: '5px',
                                                            borderRadius: '10px',
                                                            display: 'block',
                                                            marginBottom: '5px'
                                                        }}
                                                    />
                                                ))}
                                                {userMessage.message && <span style={{ fontSize: '14px',whiteSpace:'pre-line' }}><ReadMore text={userMessage.message} /></span>}
                                            </div>
                                            {isCurrentUser && (
                                                <button
                                                    onClick={() => {
                                                        deleteMessage(userMessage.id, selectedUser.id)
                                                        alert('The message is deleted only for you!');
                                                        showMessage();
                                                    }}
                                                    style={{
                                                        cursor: 'pointer',
                                                        background: 'transparent',
                                                        border: 'none',
                                                        marginTop: '5px',
                                                        marginLeft: '5px',
                                                        fontSize: '16px',
                                                        color: 'red'
                                                    }}
                                                >
                                                    <img src={deleteIcon} className='w-5 h-5' alt="❌" />
                                                </button>
                                            )}
                                            {!isCurrentUser &&(
                                                    <button className='block'
                                                        onClick={() => {
                                                            deleteMessage(userMessage.id, selectedUser.id)
                                                            alert('The message is deleted only for you!');
                                                            showMessage();
                                                        }}
                                                        style={{
                                                            cursor: 'pointer',
                                                            background: 'transparent',
                                                            border: 'none',
                                                            marginTop: '5px',
                                                            marginLeft: '5px',
                                                            fontSize: '16px',
                                                            color: 'red'
                                                        }}
                                                    >
                                                        <img src={deleteIcon} className='w-5 h-5' alt="❌" />
                                                    </button>
                                                )}
                                                
                                        </div>
                                    );
                                })}
                            </div>

                            <div style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#fff',
                                boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height:'10%'
                            }}>
                                <div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        multiple
                                    />
                                    <BiImageAdd
                                        className='cursor-pointer text-3xl mt-1 hover:bg-gray-200 rounded mr-2'
                                        onClick={() => {
                                            setOpenModal(true);
                                        }} />
                                </div>
                                <TextField
                                        multiline
                                        value={message}
                                        className=' border pl-5'
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type a message"
                                        style={{
                                            width: '85%',
                                            marginRight: '10px',
                                        }}
                                    />
                                <RiMoneyRupeeCircleLine onClick={() => handlenavigation(selectedUser.id)} className='text-5xl mx-3 cursor-pointer hover:bg-gray-200 rounded' />
                                <Button
                                    onClick={sendMessage}
                                    variant="contained" className="postButton bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500 "
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    )}
                    {selectedCommunity && (
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px',
                                borderBottom: '1px solid #ddd'
                            }}>
                                <ArrowLeft onClick={() => setSelectedCommunity(null)} />
                                <Avatar src={profileicon} />
                                <div style={{ marginLeft: '10px' }}>
                                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                        {communityNames[selectedCommunity]}
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                                overflowY: 'scroll',
                                paddingBottom: '80px',
                                backgroundImage: `url(${chat_bg})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'right',
                                backgroundRepeat: 'no-repeat',
                                backgroundAttachment: 'fixed',
                                height: '100%',
                                width: '100%',
                            }}>
                                {communityMessages.map((message, index) => {
                                    const isCurrentUser = message.senderId === auth.currentUser?.uid;
                                    return (
                                        <div key={index} style={{
                                            display: 'flex',
                                            justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                                            marginBottom: '15px',
                                            paddingLeft: '10px',
                                            paddingRight: '10px',
                                        }}>
                                            <div className='mr-2' style={{ fontSize: '10px', color: 'black', marginTop: '5px' }}>
                                                {new Date(message.timestamp.seconds * 1000).toLocaleDateString()}
                                                <br />
                                                {new Date(message.timestamp.seconds * 1000).toLocaleTimeString()}
                                            </div>
                                            <div className='mt-1' style={{
                                                background: isCurrentUser ? 'linear-gradient(to bottom, #1a0d46, #0b3b7e, #0aa6c1)' : '#FFFFFF', // Gradient background for current user
                                                color: isCurrentUser ? '#FFFFFF' : '#000',
                                                padding: '10px',
                                                borderRadius: '15px',
                                                maxWidth: '80%',
                                                display: 'inline-block',
                                                wordBreak: 'break-word',
                                                marginLeft: isCurrentUser ? '10px' : '0',
                                                marginRight: isCurrentUser ? '0' : '10px',
                                            }}>

                                                <Link to={`/otherprofile/${message.senderId}`}><span className='hover:underline cursor-pointer' style={{ fontSize: '15px', fontWeight: 'bolder' }}>{senderNames[message.senderId] || "Loading..."}</span></Link>
                                                <br />
                                                {message.images && message.images.map((img, index) => (
                                                    <img
                                                        key={index}
                                                        src={img}
                                                        alt={`Image-${index}`}
                                                        style={{
                                                            width: '100px',
                                                            height: '100px',
                                                            marginTop: '5px',
                                                            borderRadius: '10px',
                                                            display: 'block',
                                                            marginBottom: '5px'
                                                        }}
                                                    />
                                                ))}
                                                {message.message && <span style={{ fontSize: '14px', whiteSpace:'pre-line' }}><ReadMore text={message.message} /></span>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#fff',
                                boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height:'10%'
                            }}>
                                <div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        multiple
                                    />

                                    <BiImageAdd
                                        className='cursor-pointer text-3xl mt-1 hover:bg-gray-200 rounded mr-2'
                                        onClick={() => {
                                            setOpenCommunityModal(true);
                                        }} />
                                </div>
                                <TextField
                                        multiline
                                        value={comMessage}
                                        className=' border pl-5'
                                        onChange={(e) => setComMessage(e.target.value)}
                                        placeholder="Type a message"
                                        style={{
                                            width: '85%',
                                            marginRight: '10px',
                                        }}
                                    />
                                <Button
                                    onClick={() => handleSendCommunityMessage(selectedCommunity)}
                                    variant="contained"
                                    className="postButton bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500"
                                >
                                    Send
                                </Button>
                            </div>
                        </ div>
                    )}
                    {isEditing && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
                                <h1><strong>Create a Group</strong></h1>
                                <br />
                                <input type='text' style={{border:'2px solid black', height:'50px', width:'90%', paddingLeft:'10px', marginBottom:'10px'}} placeholder='Group Name' value={groupName} onChange={handlenamechange} />
                                <br />
                                <Autocomplete
                                    disablePortal
                                    multiple
                                    options={connectedUsers}
                                    getOptionLabel={(option) => option.username}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="members" />}
                                    onChange={(event, value) => setSelectedUsers(value)}
                                />
                                <div>
                                    <Button onClick={handleClose}>close</Button>
                                    <Button disabled={groupName == ''} onClick={handleSave}>Save</Button>
                                </div>
                            </div>
                        </div>
                    )}
                    {isCommunityEditing && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
                                <h1><strong>Create a Community</strong></h1>
                                <br />
                                <input 
                                    type='text' 
                                    style={{
                                        border: '2px solid black', 
                                        height: '50px', 
                                        width: '90%', 
                                        paddingLeft: '10px', 
                                        borderRadius: '8px', 
                                        fontSize: '16px', 
                                        marginBottom: '10px',
                                    }}  
                                    placeholder='Community Name' 
                                    value={communityName} 
                                    onChange={handleCommunitynamechange} 
                                />

                                <TextField 
                                    label='Describe the purpose of this community' 
                                    value={communityDescription} 
                                    onChange={(e) => setcommunityDescription(e.target.value)} 
                                    variant="outlined" 
                                    fullWidth 
                                    style={{
                                        borderRadius: '8px', 
                                        fontSize: '16px', 
                                    }} 
                                />
                                <br />
                                <div>
                                    <Button onClick={handleCommunityClose}>close</Button>
                                    <Button disabled={communityName == ''} onClick={handleCommunitySave}>Save</Button>
                                </div>
                            </div>
                        </div>
                    )}
                    <Modal
                        open={openModal}
                        onClose={() => handleuserclosemodal}
                    >
                        <Box sx={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: 24,
                            width: 400, textAlign: 'center'
                        }}>
                            <h3>Choose Images (Max 3)</h3>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                multiple
                            />
                            <Button onClick={handleImageClick}>Choose Files</Button>
                            <div style={{ marginTop: '10px' }}>
                                {previewImages.map((imageUrl, index) => (
                                    <div key={index} style={{ marginBottom: '10px' }} className=' bg-blue-50 p-2 w-fit rounded-xl'>
                                        <img src={imageUrl} alt={`Preview-${index}`} style={{ width: '100px', height: '100px', margin: '0 10px' }} />
                                        <Button onClick={() => handleDeletePreviewImage(imageUrl)} className='' style={{ color: 'red' }}>
                                            <img src={deleteIcon} className='' alt="Delete" style={{ width: '20px' }} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <TextField
                                multiline
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                label="Add a Descreption"
                                className=''
                                style={{
                                    width: '85%',
                                    marginRight: '10px',
                                }}
                            />
                            <Button
                                onClick={()=>handleuserclosemodal()}
                                className='bg-gradient-to-r from-blue-900/80 via-blue-700/80 to-cyan-500/80'
                                style={{
                                    marginRight:'5px',
                                    color: '#fff',
                                    padding: '12px 24px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginTop: '20px',
                                }}
                            >
                                Close
                            </Button>
                            <Button
                                onClick={sendMessage}
                                className='bg-gradient-to-r from-blue-900/80 via-blue-700/80 to-cyan-500/80'
                                style={{

                                    color: '#fff',
                                    padding: '12px 24px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginTop: '20px',
                                }}
                            >
                                Send
                            </Button>
                        </Box>
                    </Modal>
                    <Modal
                        open={openGroupModal}
                        onClose={() => handlegroupclosemodal}
                    >
                        <Box sx={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: 24,
                            width: 400, textAlign: 'center'
                        }}>
                            <h3>Choose Images (Max 3)</h3>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                multiple
                            />
                            <Button onClick={handleImageClick}>Choose Files</Button>
                            <div style={{ marginTop: '10px' }}>
                                {previewImages.map((imageUrl, index) => (
                                    <div key={index} style={{ marginBottom: '10px' }} className=' bg-blue-50 p-2 w-fit rounded-xl'>
                                        <img src={imageUrl} alt={`Preview-${index}`} style={{ width: '100px', height: '100px', margin: '0 10px' }} />
                                        <Button onClick={() => handleDeletePreviewImage(imageUrl)} className='' style={{ color: 'red' }}>
                                            <img src={deleteIcon} className='' alt="Delete" style={{ width: '20px' }} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <TextField
                                multiline
                                value={grpmessage}
                                onChange={(e) => setGrpMessage(e.target.value)}
                                label="Add a Descreption"
                                className=''
                                style={{
                                    width: '85%',
                                    marginRight: '10px',
                                }}
                            />
                            <Button
                                onClick={()=>handlegroupclosemodal()}
                                className='bg-gradient-to-r from-blue-900/80 via-blue-700/80 to-cyan-500/80'
                                style={{
                                    marginRight:'5px',
                                    color: '#fff',
                                    padding: '12px 24px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginTop: '20px',
                                }}
                            >
                                Close
                            </Button>
                            <Button
                                onClick={()=>handleSendMessage()}
                                className='bg-gradient-to-r from-blue-900/80 via-blue-700/80 to-cyan-500/80'
                                style={{

                                    color: '#fff',
                                    padding: '12px 24px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginTop: '20px',
                                }}
                            >
                                Send
                            </Button>
                        </Box>
                    </Modal>
                    <Modal
                        open={openCommunityModal}
                        onClose={() => handlecommunityclosemodal}
                    >
                        <Box sx={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: 24,
                            width: 400, textAlign: 'center'
                        }}>
                            <h3>Choose Images (Max 3)</h3>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                multiple
                            />
                            <Button onClick={handleImageClick}>Choose Files</Button>
                            <div style={{ marginTop: '10px' }}>
                                {previewImages.map((imageUrl, index) => (
                                    <div key={index} style={{ marginBottom: '10px' }} className=' bg-blue-50 p-2 w-fit rounded-xl'>
                                        <img src={imageUrl} alt={`Preview-${index}`} style={{ width: '100px', height: '100px', margin: '0 10px' }} />
                                        <Button onClick={() => handleDeletePreviewImage(imageUrl)} className='' style={{ color: 'red' }}>
                                            <img src={deleteIcon} className='' alt="Delete" style={{ width: '20px' }} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <TextField
                                multiline
                                value={comMessage}
                                onChange={(e) => setGrpMessage(e.target.value)}
                                label="Add a Descreption"
                                className=''
                                style={{
                                    width: '85%',
                                    marginRight: '10px',
                                }}
                            />
                            <Button
                                onClick={()=>handlecommunityclosemodal()}
                                className='bg-gradient-to-r from-blue-900/80 via-blue-700/80 to-cyan-500/80'
                                style={{
                                    marginRight:'5px',
                                    color: '#fff',
                                    padding: '12px 24px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginTop: '20px',
                                }}
                            >
                                Close
                            </Button>
                            <Button
                                onClick={()=>handleSendCommunityMessage()}
                                className='bg-gradient-to-r from-blue-900/80 via-blue-700/80 to-cyan-500/80'
                                style={{

                                    color: '#fff',
                                    padding: '12px 24px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginTop: '20px',
                                }}
                            >
                                Send
                            </Button>
                        </Box>
                    </Modal>
                </div>
            )}
        </div>
    );
};

export default ChatPage;