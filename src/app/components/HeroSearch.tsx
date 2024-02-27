"use client";

import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { GitHubUser } from "../types";
import axios from "axios";

interface DropDownCardProps {
  name: string;
  avatar_url: string;
  login: string;
  setName: (name: string) => void;
  setSearchedUser: (user: GitHubUser | null) => void;
}

function DropDownCard ({ name, avatar_url, login, setName, setSearchedUser }: DropDownCardProps) {


  function handleClick() {
    setName(login);
    setSearchedUser(null);
  }

  return(
    <button onClick={handleClick} className="absolute bottom-[-7rem] p-3 flex items-center gap-3 w-96 rounded-lg bg-eerie-black">
      <Image
        src={avatar_url}
        alt="User avatar"
        width={70}
        height={70}
        className="rounded-md shrink-0"
      />
      <div className="flex flex-col items-start">
        <p className="text-xl">{name}</p>
        <p className="text-columbia-blue text-sm">{login}</p>
      </div>  
    </button>
  )
}

interface HeroSearchProps {
  setName: (name: string) => void;
}

export default function HeroSearch({ setName }: HeroSearchProps) {

  const [searchedUser, setSearchedUser] = useState<GitHubUser | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    if (!name) return;

    try {
      const response = await axios.get(`https://api.github.com/users/${name}`);
      setSearchedUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("User not found");
    }
  }

  return (
    <section className="w-full bg-[url('/hero-image-github-profile.png')] h-64 flex justify-center items-start bg-center pt-14 bg-cover bg-no-repeat">
      <form onSubmit={onSubmit} className='relative'>
        <Image
          src='/Search.svg'
          alt='Search icon'
          width={20}
          height={20}
          className='absolute left-3 top-3'
        />
        <input
          type='text'
          name='name'
          className='outline-royal-blue outline-2 bg-independence text-columbia-blue h-10 w-96 rounded pl-10'
        />
        {searchedUser && (
          <DropDownCard
            name={searchedUser.name}
            avatar_url={searchedUser.avatar_url}
            login={searchedUser.login}
            setName={setName}
            setSearchedUser={setSearchedUser}
          />
        )}
      </form>
    </section>
  );
}
