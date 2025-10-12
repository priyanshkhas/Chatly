// customHooks/getOtherUsers.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData, setOtherUsers } from "../redux/userSlice";
import { serverUrl } from "../main";
import { setMessages } from "../redux/messageSlice";

const getMessages = () => {
  const dispatch = useDispatch();
  let {userData, selectedUser} = useSelector(state => state.user);
  useEffect(() => {
    if (!selectedUser || !selectedUser._id) return;

    const fetchMessages = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`, {
          withCredentials: true,
        });
        dispatch(setMessages(result.data));
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [selectedUser, userData]);

  return null; // Return null since this is a custom hook
};

export default getMessages;
