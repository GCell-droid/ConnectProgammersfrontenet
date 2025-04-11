import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { fillRequestInbox } from "../utils/requestSlice";
import Loading from "./Loading";
import AlertComp from "./AlertComp";
import Error from "./Error";
const Request = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.requests);
  const [isAccepted, setisAccepted] = useState(false);
  const getRequest = async () => {
    const res = await axios.get(BASE_URL + "/user/requests", {
      withCredentials: true,
    });
    dispatch(fillRequestInbox(res?.data?.inboxArray));
  };
  const acceptRequest = async (reqId) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/accepted/" + reqId,
        {},
        { withCredentials: true }
      );
      setisAccepted(true);
      setTimeout(() => {
        setisAccepted(false);
      }, 2000);
      getRequest();
    } catch (err) {
      <Error message={err.message} />;
    }
  };
  const rejectRequest = async (reqId) => {
    await axios.post(
      BASE_URL + "/request/review/rejected/" + reqId,
      {},
      { withCredentials: true }
    );
    getRequest();
  };
  useEffect(() => {
    getRequest();
  }, []);
  if (request === null) return <Loading />;
  if (request.length == 0)
    return (
      <h1 className="text-center text-3xl mt-10">
        No Request Found
        {isAccepted && <AlertComp message={"Request Accepted :)"} />}
      </h1>
    );
  return (
    <div className=" m-auto mt-10 shadow-lg shadow-black rounded-lg p-4">
      {isAccepted && <AlertComp message={"Request Accepted :)"} />}
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-3xl opacity-60 tracking-wide text-center mb-5">
          Requests
        </li>
        <div className="ml-10">
          {request?.map((requestUser) => {
            const reqId = requestUser?._id;
            const fromUser = requestUser?.fromUserId;

            if (!fromUser) return null;

            const {
              _id,
              photoUrl,
              firstName,
              skills,
              gender,
              age,
              description,
            } = fromUser;

            return (
              <li key={_id} className="list-row">
                <div>
                  <img
                    className="size-10 rounded-box"
                    src={photoUrl}
                  />
                </div>
                <div>
                  <div>{firstName}</div>
                  <div className="flex">
                    <div className="text-xs uppercase font-semibold opacity-60 mr-4">
                      {gender}
                    </div>
                    <div className="text-xs uppercase font-semibold opacity-60 text-accent mr-4">
                      Age: {age}
                    </div>
                    {skills && skills.length > 0 && (
                      <div className="text-xs uppercase font-semibold opacity-60 mr-2">
                        Skills:{" "}
                      </div>
                    )}
                    {skills && skills.length > 0 ? (
                      skills.map((s, index) => (
                        <div className="flex">
                          <div key={index} className="kbd p-2 -mt-1">
                            {s}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs italic opacity-60"></div>
                    )}
                  </div>
                </div>
                <p className="list-col-wrap text-xs">{description}</p>
                <div className="flex sm:flex-col lg:flex-row">
                  <button
                    className="btn btn-square btn-ghost scale-150"
                    onClick={() => acceptRequest(reqId)}
                  >
                    ✔️
                  </button>
                  <button
                    className="btn btn-square btn-ghost scale-125"
                    onClick={() => rejectRequest(reqId)}
                  >
                    ❌
                  </button>
                </div>
              </li>
            );
          })}
        </div>
      </ul>
    </div>
  );
};
export default Request;
