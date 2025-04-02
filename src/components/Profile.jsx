import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants.js";
import NewFeedCard from "./NewFeedCard.jsx";
import Loading from "./Loading.jsx";
import { addUser } from "../utils/userSlice.js";
import AlertComp from "./AlertComp.jsx";

const Profile = () => {
  const user =   useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [firstname, setFirstName] = useState(user?.firstName || "");
  const [skill, setSkills] = useState(Array.isArray(user?.skills) ? user.skills : []);
  const [gender, setGender] = useState(user?.gender || "male");
  const [photoUrl, setPhotoURL] = useState(
    user?.photoUrl ||
      "https://static.vecteezy.com/system/resources/previews/045/944/199/non_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg"
  );
  const [age, setAge] = useState(user?.age || "");
  const [description, setDescription] = useState(user?.description || "");
  const [error, setError] = useState("");
  useEffect(()=>{
    setFirstName(user?.firstName);
        setSkills(Array.isArray(user?.skills) ? user?.skills : []);
        setGender(user?.gender || "male");
        setPhotoURL(user?.photoUrl || "");
        setAge(user?.age || "");
        setDescription(user?.description || "");
  },[user])
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName: firstname,
          skills: skill,
          gender: gender,
          age: age,
          description: description,
          photoUrl: photoUrl,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.user)); // Update Redux store
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
      setError(""); // Clear error on success
    } catch (err) {
      setError(err.response?.data || "An error occurred. Please try again.");
      setIsSuccess(false);
    }
  };

  if (!user) return <Loading />;

  return (
    <div className="md:flex  justify-center mt-10 ">
      {isSuccess && <AlertComp message={"Update Success"} />}
      {/* Profile Card */}
      <div className="my-4">
        <NewFeedCard
          user={{
            firstName: firstname,
            skills: skill,
            gender,
            age,
            description,
            photoUrl: photoUrl,
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
            onChange={(e) => setSkills(e.target.value.split(" "))}
            value={skill.join(" ")}
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
            value={photoUrl}
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
