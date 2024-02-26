import { GitHubRepository } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

function updatedXTimeAgo(updated_at: string) {
  const lastUpdated = new Date(updated_at);
  const now = new Date();
  const timeDiff = now.getTime() - lastUpdated.getTime();
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return days;
}


interface RepoCardProps {
  // pick name, description, and html_url from GitHubRepository
  repo: Pick<
    GitHubRepository,
    | "name"
    | "description"
    | "html_url"
    | "license"
    | "forks_count"
    | "stargazers_count"
    | "updated_at"
  >;
}

function RepoCard({ repo }: RepoCardProps) {

  const haveLicense = repo.license?.name != undefined;

  return (
    <a
      href={repo.html_url}
      target='_blank'
      className='flex flex-col justify-end bg-gradient-to-r from-eerie-black to-yankees-blue rounded-lg p-5'
    >
      <p className='text-2xl mb-3'>{repo.name}</p>
      <p className='text-lg text-columbia-blue'>{repo.description}</p>
      <div className='flex gap-4 mt-4 text-sm'>
        {haveLicense && (
          <div className='flex gap-1'>
            <Image
              src='/Chield_alt.svg'
              alt='License icon'
              width={20}
              height={20}
            />
            <span>{repo.license?.name.split(" ")[0]}</span>
          </div>
        )}
        <div className='flex gap-1'>
          <Image
            src='/Nesting.svg'
            alt='Fork icon'
            width={20}
            height={20}
          />
          <span>{repo.forks_count}</span>
        </div>
        <div className='flex gap-1'>

          <Image
            src='/Star.svg'
            alt='Star icon'
            width={20}
            height={20}
          />

          <span>{repo.stargazers_count}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <span className='text-xs'>
            Updated {updatedXTimeAgo(repo.updated_at)} days ago
          </span>
        </div>
      </div>
    </a>
  );
}

interface ProfileReposProps {
  userRepos: GitHubRepository[];
}

export default function ProfileRepos({ userRepos }: ProfileReposProps) {

  const fourRepos = userRepos.slice(0, 4);

  return (
    <div className='mt-8 grid grid-cols-2 grid-rows-2 gap-12'>
      {fourRepos.map((repo) => {
        const {
          name,
          description,
          html_url,
          license,
          forks_count,
          stargazers_count,
          updated_at,
        } = repo;
        return (
          <RepoCard
            key={repo.id}
            repo={{
              name,
              description,
              html_url,
              license,
              forks_count,
              stargazers_count,
              updated_at,
            }}
          />
        );
      })}
    </div>
  );
}
