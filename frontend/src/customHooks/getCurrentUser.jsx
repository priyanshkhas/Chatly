import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../main";

const getCurrentUser = () => {
  let dispatch = useDispatch();
  let {userData} = useSelector(state=>state.user);
  useEffect(() => {
    // Fetch current user logic here
    const fetchUser=async()=>{
       try{
           let result=await axios().get(`${serverUrl}/api/user/current`,{withCredentials:true})
           dispatch(setUserData(result.data))
       }catch(error){
            console.log("Error fetching current user:",error) 
       }
    }
    fetchUser()
  }, [useData]);
}

export default getCurrentUser;