"use client";

const PrintTime = ({
  duration,
  className = "",
  showSeconds = false,
}: {
  duration: number;
  className?: string;
  showSeconds?: boolean;
}) => {
  const hours = Math.floor(duration / 60 / 60);
  const minutes = Math.round((duration - hours * 60 * 60) / 60);

  if (className.length === 0) {
    return (
      <>
        {hours > 0 && `${hours} t -`} {minutes} min
      </>
    );
  } else
    return (
      <div className={className}>
        {hours > 0 && `${hours} t -`} {minutes} min
      </div>
    );
};

export default PrintTime;
