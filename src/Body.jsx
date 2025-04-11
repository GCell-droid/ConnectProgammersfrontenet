import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { addUser } from "./utils/userSlice";
const Body = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleGetUser = async () => {
    try {
      if (!user) {
        //there is no data in store
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      }
    } catch (err) {
      if (err.status == 401) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    handleGetUser();
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
