import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import NewFeedCard from "./NewFeedCard";
import Loading from "./Loading";
import { addUser } from "../utils/userSlice";
import AlertComp from "./AlertComp";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [isSuccess,setisSuccess] = useState(false)
  const [firstname, setFirstName] = useState(user?.firstName || "");
  const [skill, setSkills] = useState(user?.skills || "");
  const [gender, setGender] = useState(user?.gender || "male");
  const [photoURL, setPhotoURL] = useState(user?.photoUrl || "https://static.vecteezy.com/system/resources/previews/045/944/199/non_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg");
  const [age, setAge] = useState(user?.age || "");
  const [description, setDescription] = useState(user?.description || "");
  const [error, setError] = useState("");

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName: firstname,
          skills: skill,
          gender:gender,
          age:age,
          description:description,
          photoUrl: photoURL,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.user)); // Update Redux store
      setisSuccess(true)
      setTimeout(()=>{
        setisSuccess(false)
      },2000)
      setError(""); // Clear error on success
    } catch (err) {
      setError(err.response.data);
      setisSuccess(false)
    }
  };

  if (!user) return <Loading />;

  return (
    <div className="md:flex  justify-center mt-10 ">
      {isSuccess&&<AlertComp message={"Update Success"}/>}
      {/* Profile Card */}
      <div className="my-4">

      <NewFeedCard
        user={{
          firstName: firstname,
          skills: skill,
          gender,
          age,
          description,
          photoUrl: photoURL,
        }}
        />
        </div>

      {/* Profile Form */}
      <div className="flex justify-center ml-8 my-4">
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <label className="font-bold text-center text-2xl mb-2">Profile</label>

          <label className="fieldset-legend">Name</label>
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstname}
            className="input"
            placeholder="Name"
          />

          <label htmlFor="gender-select" className="fieldset-legend">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="select select-primary"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label className="fieldset-legend">Age</label>
          <input
            type="number"
            onChange={(e) => setAge(e.target.value)}
            value={age}
            className="input"
            placeholder="Age"
          />

          <label className="fieldset-legend">Skills</label>
          <input
            type="text"
            onChange={(e) => setSkills(e.target.value)}
            value={skill}
            className="input"
            placeholder="Skills"
          />

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              className="textarea"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Description"
            ></textarea>
          </fieldset>

          <label className="fieldset-legend">Photo URL</label>
          <input
            type="text"
            onChange={(e) => setPhotoURL(e.target.value)}
            value={photoURL}
            className="input"
            placeholder="Photo URL"
          />

          {error && <p className="text-red-600">{error}</p>}

          <button className="btn btn-accent mt-2" onClick={saveProfile}>
            Save
          </button>
        </fieldset>
      </div>
    </div>
  );
};

export default Profile;
