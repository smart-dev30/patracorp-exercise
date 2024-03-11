import React, { useState, useEffect } from "react";

import "./styles.css";

function ProfileCard() {
  const [profile, setProfile] = useState({}); // State variable to store profile data

  // Function to fetch user profile data from an API endpoint
  const fetchUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/user/getProfile/65ef6a5a8aaed50848ff3dd6",
      );
      // Parsing response as JSON
      const result = await response.json();

      // Updating profile state with fetched data
      setProfile(result);
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect hook to execute fetchUser function once when the component mounts
  useEffect(() => {
    fetchUser();
  }, []);

  // Rendering the profile card with fetched profile data
  return (
    <div className="container">
      <div className="card">
        <div className="profile-picture" />
        <div className="profile-info">
          <h2>
            {profile.firstName} {profile.lastName}
          </h2>
          <p>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
          <p>{profile.phone}</p>
          <p>
            {profile.address}, {profile.city}
          </p>
          <p>{profile.state}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
