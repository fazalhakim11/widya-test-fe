import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../components/navbar";
import { fetchUserProfile } from "../../stores/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [token, dispatch]);

  if (!user)
    return (
      <div className="flex justify-center h-[100vh]">
        <p className="text-white self-center">Loading profile...</p>;
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="text-white mx-5">
        <h1 className="text-xl font-bold text-center mb-2">Profile</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Gender: {user.gender}</p>
      </div>
    </>
  );
};

export default Profile;
