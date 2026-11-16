"use client";

const PrintDate = ({
  date,
  className = "",
  onlyDate = false,
}: {
  date: string;
  onlyDate?: boolean;
  className?: string;
}) => {
  const timeStamp = new Date(date);
  const newDate = new Date();
  if (className.length === 0) {
    return (
      <>
        {newDate.getDate() === timeStamp.getDate() &&
        newDate.getMonth() === timeStamp.getMonth() &&
        newDate.getFullYear() === timeStamp.getFullYear() ? (
          "tänään"
        ) : (
          <>
            {timeStamp.getDate()}.{timeStamp.getMonth() + 1}.-
            {timeStamp.getFullYear().toString().slice(2, 4)}
          </>
        )}
        {!onlyDate && (
          <>
            {" "}
            {timeStamp.getHours()}:
            {String(timeStamp.getMinutes()).padStart(2, "0") + " "}
          </>
        )}
      </>
    );
  } else
    return (
      <>
        {newDate.getDate() === timeStamp.getDate() &&
        newDate.getMonth() === timeStamp.getMonth() &&
        newDate.getFullYear() === timeStamp.getFullYear() ? (
          <>tänään</>
        ) : (
          <p className={className}>
            {timeStamp.getDate()}.{timeStamp.getMonth() + 1}.-
            {timeStamp.getFullYear().toString().slice(2, 4)}
          </p>
        )}
        {!onlyDate && (
          <p className={className}>
            {timeStamp.getHours()}:
            {String(timeStamp.getMinutes()).padStart(2, "0")}
          </p>
        )}
      </>
    );
};

export default PrintDate;
