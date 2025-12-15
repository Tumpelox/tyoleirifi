import { PlayerProfile } from "@/models";
import Image from "next/image";
import Link from "next/link";
import PlayerStreak from "./PlayerStreak";
import { cn } from "@/utils/mergeClasses";

const ProfileLink = ({
  player,
  className = "",
  children,
  flex = false,
  online = false,
}: {
  player: PlayerProfile;
  className?: string;
  children?: React.ReactNode;
  flex?: boolean;
  online?: boolean;
}) => {
  return (
    <div className={`mb-1 relative`}>
      {online && (
        <div
          title="Paikalla"
          className="absolute -translate-y-2 top-1 left-1 h-4 w-4 border-4 border-emerald-600 bg-emerald-900 rounded-full shadow-sm z-10 flex items-center justify-center"
        ></div>
      )}
      <Link
        href={`/pelaajat/${player.uuid}`}
        title={player.name}
        className={cn(`cursor-pointer relative`, className)}
      >
        {player.op && flex ? (
          <svg
            className="w-16 absolute top-1 -translate-y-full"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            fill="#ffcd00"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            clipRule="evenodd"
            viewBox="0 0 488 177"
          >
            <path
              d="M587.695 227.568l-93.33 93.331-84.508-84.508-64.311 64.311-64.325-64.325-84.522 84.522-93.33-93.331h-1.262v176.471h487.27V227.568h-1.682z"
              transform="translate(-102.107 -227.568)"
            ></path>
          </svg>
        ) : (
          <></>
        )}
        <div className="w-20 dark:brightness-[0.85] h-20 relative flex items-center justify-center">
          <Image
            src={`/api/pelaajat/profile/head?url=${encodeURIComponent(
              player.skin ?? ""
            )}`}
            unoptimized
            alt={`Pelaajan ${player?.name} kasvot`}
            style={{ imageRendering: "pixelated" }}
            width={80}
            height={80}
            className={`w-20 dark:brightness-[0.85] absolute z-0`}
          />
          <PlayerStreak player={player} className="absolute -top-2 -right-1" />
        </div>
        {children}
      </Link>
    </div>
  );
};

export default ProfileLink;
