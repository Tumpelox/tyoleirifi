import { PlayerProfile } from "@/models";
import { cn } from "@/utils/mergeClasses";
import Image from "next/image";

const PlayerStreak = ({
  player,
  className,
  longest = false,
}: {
  player: PlayerProfile;
  className?: string;
  longest?: boolean;
}) => {
  if (longest && (!player.longestStreak || player.longestStreak <= 0)) {
    return null;
  }

  if (!longest && (!player.currentStreak || player.currentStreak <= 0)) {
    return null;
  }

  return (
    <div className={cn(className)}>
      <div className="w-6 h-10 relative">
        <span
          className="absolute z-10 text-sm font-bold text-black"
          style={{
            translate: "8px 16px",
          }}
        >
          {longest ? player.longestStreak : player.currentStreak}
        </span>
        <Image
          src={"/sprites/flame.png"}
          unoptimized
          style={{
            imageRendering: "pixelated",
            position: "absolute",
            height: "2.6rem",
            width: "2.6rem",
            maxWidth: "none",
            translate: "-8px 0",
          }}
          alt="Palava liekki streakin merkkinä"
          width={8}
          height={8}
        />
      </div>
    </div>
  );
};

export default PlayerStreak;
