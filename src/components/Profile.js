import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.user.fullName}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser.user.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.user.email}
      </p>
    </div>
  );
};

export default Profile;
