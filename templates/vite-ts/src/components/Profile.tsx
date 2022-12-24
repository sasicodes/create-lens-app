import { useProfile } from "@lens-protocol/react";

const Profile = () => {
  const { data: profile, loading } = useProfile({
    handle: "lensprotocol.test",
  });

  return (
    <div className="card">
      <p>{loading && "Loading..."}</p>
      <h6>{profile?.id}</h6>
      <p>{profile?.handle}</p>
    </div>
  );
};

export default Profile;
