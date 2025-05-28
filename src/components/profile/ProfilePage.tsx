import TabsProfile from "./Tabs/TabsProfile";

const ProfilePage = () => {
  return (
    <div className="flex h-screen">
      <div className="border-2 w-full rounded-2xl">
        <TabsProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
