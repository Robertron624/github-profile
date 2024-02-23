"use client";

import { FormEvent } from "react";
import { GitHubUser } from "../types";

interface HeroSearchProps {
    setUser: (user: GitHubUser) => void;
}

export default function HeroSearch({ setUser }: HeroSearchProps){
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    const response = await fetch(`https://api.github.com/users/${name}`);
    const data = await response.json();

    console.log(data);
    setUser(data);
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
