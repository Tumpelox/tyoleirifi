import { PlayerProfile } from "@/models";
import PrintDate from "./PrintDate";
import PrintTime from "./PrintTime";
import ProfileLink from "./ProfileLink";
import { cn } from "@/utils/mergeClasses";
import { useCallback, useEffect, useState } from "react";

const PlayerCard = ({
  player,
  full = false,
  online = false,
}: {
  player: PlayerProfile;
  full?: boolean;
  online?: boolean;
}) => {
  const calculatePlayTime = useCallback(
    (player: PlayerProfile) => {
      if (online) {
        return (
          (new Date().getTime() - new Date(player.lastJoinDate).getTime()) /
          1000
        );
      } else {
        return (
          (new Date(player.lastPlayDate).getTime() -
            new Date(player.lastJoinDate).getTime()) /
          1000
        );
      }
    },
    [online]
  );

  const [playTimeSeconds, setPlayTimeSeconds] = useState<number>(
    calculatePlayTime(player)
  );

  useEffect(() => {
    let interval = null;
    if (online) {
      interval = setInterval(() => {
        setPlayTimeSeconds(calculatePlayTime(player));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [player, online, calculatePlayTime]);

  return (
    <div
      className={cn(
        "bg-linear-to-r from-tumma/35 to-tumma/40 rounded-sm py-2 px-1",
        { "bg-[#ffcd00]/80": player.op }
      )}
    >
      <p className="w-full text-sm text-center wrap-break-word font-bold mt-1 mb-2">
        {player.name}
      </p>
      <ProfileLink
        player={player}
        className="relative flex flex-col items-center"
      >
        {full && (
          <div>
            <p className="w-full text-sm font-light text-current/80 text-center wrap-break-word">
              <PrintDate date={player.lastPlayDate} />
            </p>

            {!online &&
              player.lastJoinDate !== "null" &&
              player.lastPlayDate && (
                <p className="w-full text-sm text-center wrap-break-word">
                  ⏱️
                  <PrintTime
                    duration={
                      (new Date(player.lastPlayDate).getTime() -
                        new Date(player.lastJoinDate).getTime()) /
                      1000
                    }
                  />
                </p>
              )}
          </div>
        )}
        {online && (
          <p className="w-full text-sm text-center wrap-break-word">
            ⏱️
            <PrintTime duration={playTimeSeconds} showSeconds />
          </p>
        )}
      </ProfileLink>
    </div>
  );
};

export default PlayerCard;
