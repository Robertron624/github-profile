interface ProfileCardProps {
    name: string;
    value: string | number;
}

export default function ProfileCard({ name, value }: ProfileCardProps) {
    return (
        <div className="flex items-center rounded-xl bg-yankees-blue">
            <p className="px-8 py-4 text-columbia-blue relative">
                {name}
                <span className="absolute top-[15%] bottom-0 right-0 w-[1px] h-[70%] bg-columbia-blue"></span>
            </p>
            <p className="px-8 py-4">{value}</p>
        </div>
    );
}