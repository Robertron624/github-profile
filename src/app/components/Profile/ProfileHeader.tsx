import Image from "next/image";
import ProfileCard from "./ProfileCard";


interface ProfileHeaderProps {
    userMainData: {
        avatar_url: string;
        location: string;
        followers: number;
        following: number;
    };
}

export default function ProfileHeader({
    userMainData: {
        avatar_url,
        location,
        followers,
        following
    }
}: ProfileHeaderProps) {

    return (
        <div id="profile-header" className="w-full flex justify-center gap-9 relative py-8">
            <div className="bg-olive-drab p-3 rounded-2xl -mt-24 shrink-0">
                <Image
                    src={avatar_url}
                    alt="User avatar"
                    width={120}
                    height={120}
                    className="rounded-2xl"
                />
            </div>
            <div className="flex flex-col lg:flex-row gap-5 items-start lg:items-center lg:ml-[5%]">
                <ProfileCard name="Location" value={location} />
                <ProfileCard name="Followers" value={followers} />
                <ProfileCard name="Following" value={following} />
            </div>
        </div>
    );
}