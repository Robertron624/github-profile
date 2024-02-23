"use client";
import HeroSearch from "./components/HeroSearch";
import { useEffect, useState } from "react";
import { GitHubUser } from "./types";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";
import Profile from "./components/Profile/Profile";

export const queryClient = new QueryClient();


export default function Home() {

  const [name, setName] = useState("github");
  const [user, setUser] = useState<GitHubUser | null>(null);

 
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`https://api.github.com/users/${name}`);
      setUser(data);
    };
    fetchUser();
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <main className="flex min-h-screen flex-col items-center">
        <HeroSearch setUser={setUser}/>
        <Profile user={user} />
      </main>
    </QueryClientProvider>
  );
}
