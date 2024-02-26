import { GitHubRepository } from "@/app/types";
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
  return <a href={repo.html_url} className="flex flex-col justify-end bg-gradient-to-r from-eerie-black to-yankees-blue rounded-lg p-5">
    <p className="text-2xl mb-3">
        {repo.name}
    </p>
    <p className="text-lg text-columbia-blue">
        {repo.description}
    </p>
    <div className="flex gap-4 mt-4 text-sm">
        <div className="flex gap-2">
            <span>
                {repo.license?.name}
            </span>
        </div>
        <div className="flex gap-2">
            <span>
                {repo.forks_count}
            </span>
        </div>
        <div className="flex gap-2">
            <span>
                {repo.stargazers_count}
            </span>
        </div>
        <div className="flex gap-2 items-center">
            <span className="text-xs">
                Updated {updatedXTimeAgo(repo.updated_at)} days ago
            </span>
        </div>
    </div>
  </a>;
}

interface ProfileReposProps {
  userRepos: GitHubRepository[];
}

export default function ProfileRepos({ userRepos }: ProfileReposProps) {
  if (userRepos.length === 0) {
    return (
      <div>
        <p>This user has no repositories</p>
      </div>
    );
  }

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
