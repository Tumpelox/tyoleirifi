import Image from "next/image";
import frames from "./frames";
import { type Advancement } from "./advancements/index";

const AdvancementIcon = ({
  className = "",
  data,
  completed = false,
}: {
  className?: string;
  data: Advancement;
  completed?: boolean;
}) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={
          completed
            ? frames[`${data.frame}_completed`].src
            : frames[data.frame].src
        }
        unoptimized
        width="52"
        height="52"
        alt={`${data.frame} frame`}
        style={{ imageRendering: "pixelated" }}
        className="h-13 w-13 dark:brightness-[0.85]"
      />
      <Image
        src={data.icon.src}
        unoptimized
        width="32"
        height="32"
        alt={`Minecraft ${data.iconId}`}
        style={{ imageRendering: "pixelated" }}
        className="absolute h-8 w-8 top-2.5 left-2.5 leading-0 dark:brightness-[0.85]"
      />
    </div>
  );
};

export default AdvancementIcon;
