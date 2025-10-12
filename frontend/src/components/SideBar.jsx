import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dp from '../assets/dp.webp'; 
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import axios from 'axios';
import { serverUrl } from '../main';
import { useNavigate } from 'react-router-dom';
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';
import { useEffect } from 'react';

function SideBar() {
    let { userData, otherUsers, selectedUser, onlineUsers, searchData } = useSelector(state => state.user);
    let [search, setSearch] = useState(false);
    let [input, setInput] = useState("");
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const handleLogout = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/auth/logout`, {
            withCredentials: true
            })
            dispatch(setUserData(null));
            dispatch(setOtherUsers(null));
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    const handleSearch = async () => {
        try {
            const result = await axios.get(
            `${serverUrl}/api/user/search?query=${input}`,
            { withCredentials: true }
            );
            dispatch(setSearchData(result.data));
            console.log(result)
        } catch (error) {
            console.error("Search request failed:", error);
        }
    };

    useEffect(()=>{
        if(input){
            handleSearch()
        }
    },[input])


    return (
        <div className={`lg:w-[30%] w-full h-full overflow-hidden lg:block bg-slate-200 relative ${!selectedUser?"block":"hidden"}`}>
            <div className='w-[60px] h-[60px] mt-[10px] bg-white rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 text-gray-700 cursor-pointer shadow-lg fixed bottom-[20px] left-[10px]' onClick={handleLogout}>
                <TbLogout2 className='w-[25px] h-[25px]'/>
            </div>

            {input.length>0 && <div className="flex absolute top-[250px] z-[150] bg-white w-full h-[500px] overflow-y-auto items-center pt-[20px] flex-col gap-[10px] shadow-lg">
                        {searchData?.map((user) => (
                             <div
                                key={user._id} // add a key if available
                                className="w-[95%] h-[70px] flex items-center gap-[20px] px[10px] hover:bg-[#0e80d1] cursor-pointer border-b-2 border-gray-500"
                                onClick={() => {dispatch(setSelectedUser(user));
                                    setInput("")
                                    setSearch(false)
                                }}
                            >
                                <div className='relative rounded-full mt-[10px]  flex justify-center items-center'>
                                    <div className='w-[60px] h-[60px]  rounded-full overflow-hidden flex justify-center items-center '>
                                        <img
                                        src={user.image || dp}
                                        alt=""
                                        className='h-[100%]'
                                        />
                                    </div>
                                    {onlineUsers?.includes(user._id) &&
                                    <span className='w-[12px] h-[12px] right-[-1px] shadow-gray-500 shadow-md rounded-full absolute bottom-[6px] bg-[#3aff20]'></span>}
                                </div>
                                <h1 className="text-gray-800 font-semibold text-[20px]">{user.name || user.userName}</h1>
                            </div>
                        ))}
                        </div>}

            

        <div className="w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[20px]">
            <h1 className="text-white font-bold text-[25px]">chatly</h1>
            <div className='w-full flex justify-between items-center'>
                <h1 className="text-gray-800 font-bold text-[25px]">Hii , {userData.name || "user"}</h1>
                <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 shadow-lg cursor-pointer' onClick={() => navigate('/profile')}>
                    <img
                    src={userData.image || dp}
                    alt=""
                    className='h-[100%]'
                    />
                </div>
            </div>
            <div className='w-full flex items-center gap-[20px] overflow-y-auto py-[15px]'>
                {!search && <div className='w-[60px] h-[60px] mt-[10px] bg-white rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 cursor-pointer shadow-lg' onClick={() => setSearch(true)}>
                    <IoIosSearch className='w-[25px] h-[25px]' />
                </div>}
                {search && (
                    <form className="w-full h-[60px] bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px] relative">
                        <IoIosSearch className="w-[25px] h-[25px]" />
                        <input
                            type="text"
                            placeholder="search users..."
                            className="w-full h-full p-[10px] text-[17px] outline-0 border-0"
                            onChange={(e)=>setInput(e.target.value)}
                            value={input}
                        />
                        <RxCross2 className='w-[25px] h-[25px] cursor-pointer' onClick={() => setSearch(false)} />
                        

                    </form>
                )
                }
                {!search &&  otherUsers?.map((user) => (
                    onlineUsers?.includes(user._id) &&
                    (<div className='relative rounded-full mt-[10px] bg-white shadow-gray-500 shadow-lg flex justify-center items-center cursor-pointer' onClick={() => dispatch(setSelectedUser(user))}>
                        <div className='w-[60px] h-[60px]  rounded-full overflow-hidden flex justify-center items-center '>
                            <img
                            src={user.image || dp}
                            alt=""
                            className='h-[100%]'
                            />
                        </div>
                        <span className='w-[12px] h-[12px] right-[-1px] shadow-gray-500 shadow-md rounded-full absolute bottom-[6px] bg-[#3aff20]'></span>
                    </div>)
                    
                ))}

            </div>
        </div>
        <div className="w-full h-[50%] overflow-auto flex flex-col gap-[20px] items-center mt-[20px]">
            {otherUsers?.map((user) => (
                <div
                    key={user._id} // add a key if available
                    className="w-[95%] h-[60px] flex items-center gap-[20px] shadow-gray-500 bg-white shadow-lg rounded-full hover:bg-[#b2ccdf] cursor-pointer"
                    onClick={() => dispatch(setSelectedUser(user))}
                >
                    <div className='relative rounded-full mt-[10px] bg-white shadow-gray-500 shadow-lg flex justify-center items-center'>
                        <div className='w-[60px] h-[60px]  rounded-full overflow-hidden flex justify-center items-center '>
                            <img
                            src={user.image || dp}
                            alt=""
                            className='h-[100%]'
                            />
                        </div>
                        {onlineUsers?.includes(user._id) &&
                        <span className='w-[12px] h-[12px] right-[-1px] shadow-gray-500 shadow-md rounded-full absolute bottom-[6px] bg-[#3aff20]'></span>}
                    </div>
                    <h1 className="text-gray-800 font-semibold text-[20px]">{user.name || user.userName}</h1>
                </div>
            ))}
        </div>

        </div>
    );
}

export default SideBar;

