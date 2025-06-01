import React from "react";
import ProfilePage from "./ProfilePage";
import HeadSectionProfile from "./HeadSectionProfile";

const LayoutProfile = () => {
  return (
    <div className="flex flex-col gap-8">
      <HeadSectionProfile />
      <ProfilePage />
    </div>
  );
};

export default LayoutProfile;
