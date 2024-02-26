"use client";

import { FormEvent } from "react";
import Image from "next/image";

interface HeroSearchProps {
  setName: (name: string) => void;
}

export default function HeroSearch({ setName }: HeroSearchProps) {

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    if (!name) return;

    setName(name);
  }

  return (
    <section className="w-full bg-[url('/hero-image-github-profile.png')] h-56 flex justify-center items-center bg-center bg-cover bg-no-repeat">
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
      </form>
    </section>
  );
}
