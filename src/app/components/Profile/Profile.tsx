import { GitHubUser, GitHubRepository } from "../../types";
import ProfileHeader from "./ProfileHeader";
import ProfileRepos from "./ProfileRepos";

interface ProfileProps {
  user: GitHubUser;
  repos: GitHubRepository[];
}

export default function Profile({ user, repos }: ProfileProps) {
  return (
    <section id='profile-container' className='bg-olive-drab w-full pb-14'>
      <div className='max-w-[1100px] mx-auto'>
        <ProfileHeader
          userMainData={{
            avatar_url: user.avatar_url,
            location: user.location,
            followers: user.followers,
            following: user.following,
          }}
        />
        <p className='text-4xl mb-6'>{user.name}</p>
        <p className='text-lg text-columbia-blue'>{user.bio}</p>
        {repos?.length > 0 ? (
          <ProfileRepos userRepos={repos} />
        ) : (
          <div>
            <p>This user has no repositories</p>
          </div>
        )}

        {repos?.length > 0 ?? (
          <div className='mt-10 w-full flex justify-center'>
            <a
              href={`
            ${user.html_url}?tab=repositories`}
              target='_blank'
              className='text-columbia-blue text-xl'
            >
              View all repositories
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
