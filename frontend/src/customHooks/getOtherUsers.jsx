// customHooks/getOtherUsers.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData, setOtherUsers } from "../redux/userSlice";
import { serverUrl } from "../main";

const getOtherUsers = () => {
  const dispatch = useDispatch();
  let {userData} = useSelector(state => state.user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/others`, {
          withCredentials: true,
        });
        dispatch(setOtherUsers(result.data));
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [userData]);

  return null; // Return null since this is a custom hook
};

export default getOtherUsers;
