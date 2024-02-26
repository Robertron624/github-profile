"use client";
import HeroSearch from "./components/HeroSearch";
import { useEffect, useState } from "react";
import { GitHubRepository, GitHubUser } from "./types";
import Profile from "./components/Profile/Profile";
import axios from "axios";


export default function Home() {

  const [name, setName] = useState("github");

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepository[] | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${name}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error appropriately, e.g., display an error message to the user
      }
    };

    const fetchRepos = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${name}/repos`);
        setRepos(response.data);
      } catch (error) {
        console.error("Error fetching user repos:", error);
        // Handle error appropriately, e.g., display an error message to the user
      }
    }

    fetchUser();
    fetchRepos();
  }
  , [name]);


  return (
      <main className="flex min-h-screen flex-col items-center">
        <HeroSearch setName={setName}/>
        {user && <Profile user={user} repos={repos!} />}
      </main>
  );
}
