
import { GitHubUser } from "../../types";
import Image from "next/image";

interface ProfileProps {
    user: GitHubUser | null;
    }

export default function Profile(
    { user }: ProfileProps
) {
  return (
    <section className="profile">
      {user && (
        <div className="flex flex-col items-center">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      )}
    </section>
  );
}