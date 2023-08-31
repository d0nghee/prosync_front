import React from "react";
import axiosInstance from "../common/axiosInstance";

export default function UserProfile({ profile }) {
  return (
    <div>
      UserProfile
      <img src={profile} alt="" />
    </div>
  );
}
