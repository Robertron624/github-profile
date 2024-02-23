"use client";

import { FormEvent } from "react";
import { GitHubUser } from "../types";
import { useQueryClient } from "react-query";
import axios from "axios";

interface HeroSearchProps {
    setUser: (user: GitHubUser) => void;
}

export default function HeroSearch({ setUser }: HeroSearchProps){
    const queryClient = useQueryClient();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    try {
      const response = await axios.get(`https://api.github.com/users/${name}`);
      const data = response.data;

      // Use React Query to cache the data
      queryClient.setQueryData("user", data);

      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error appropriately, e.g., display an error message to the user
    }
  }

  return (
    <section className="w-full bg-[url('/hero-image-github-profile.png')] h-56 flex justify-center items-center bg-center bg-contain">
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='name'
          className='outline-royal-blue outline-2 border-columbia-blue border-2 bg-eerie-black text-columbia-blue h-10 w-80 rounded'
        />
      </form>
    </section>
  );
}
