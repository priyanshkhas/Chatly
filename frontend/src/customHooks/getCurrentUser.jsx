// customHooks/useCurrentUser.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../main";

const getCurrentUser = () => {
  const dispatch = useDispatch();
  let {userData} = useSelector(state => state.user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  //return null; // Return null since this is a custom hook
};

export default getCurrentUser;
