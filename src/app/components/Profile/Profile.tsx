
import { GitHubUser } from "../../types";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "react-query";
import ProfileHeader from "./ProfileHeader";

interface ProfileProps {
    name: string;
}

export default function Profile(
    { name }: ProfileProps
) {

  const { data, isLoading, isError } = useQuery("user", async () => {
    const response = await axios.get(`https://api.github.com/users/${name}`);
    return response.data;
  },{
    enabled: !!name,
  });

  const user = data as GitHubUser;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <section id="profile-container" className="bg-olive-drab w-full">
      <div className="max-w-[1100px] mx-auto">
        <ProfileHeader
          userMainData={{
            avatar_url: user.avatar_url,
            location: user.location,
            followers: user.followers,
            following: user.following
          }}
        />
        <p className="text-4xl mb-6">
          {user.name}
        </p>
        <p className="text-lg text-columbia-blue">
          {user.bio}
        </p>
      </div>
    </section>
  );
}