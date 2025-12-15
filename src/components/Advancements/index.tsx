import advancementsData from "./advancements/index";
import fi_FI from "./lang/fi_fi.json";
import en_US from "./lang/en_us.json";
import AdvancementIcon from "./Icon";
import React from "react";

const Advancements = async ({
  children,
  className,
  filter = "",
  showOnlyCompleted = false,
  hideTitle = false,
  advancements,
}: {
  children?: React.ReactNode;
  className: string;
  filter?: string;
  showOnlyCompleted?: boolean;
  hideTitle?: boolean;
  advancements: Record<string, string>;
}) => {
  return (
    <div className={`${className}`}>
      {Object.keys(advancementsData)
        .filter((key) => key.includes(filter))
        .filter((key) => {
          if (showOnlyCompleted) {
            return advancements.hasOwnProperty(key);
          } else {
            return true;
          }
        })
        .map((key, index) => {
          return (
            <div
              className="w-full flex flex-col items-center"
              key={key}
              title={
                hideTitle
                  ? `${
                      (en_US as Record<string, string>)[
                        advancementsData[key].title
                      ]
                    }\n\n${
                      (fi_FI as Record<string, string>)[
                        advancementsData[key].title
                      ]
                    }`
                  : `${
                      (en_US as Record<string, string>)[
                        advancementsData[key].description
                      ]
                    }\n\n${
                      (fi_FI as Record<string, string>)[
                        advancementsData[key].description
                      ]
                    }`
              }
            >
              <AdvancementIcon
                data={advancementsData[key]}
                key={index}
                completed={
                  !showOnlyCompleted && advancements.hasOwnProperty(key)
                }
                className="w-fit"
              />
              {!hideTitle && (
                <>
                  <p className="text-center">
                    {
                      (en_US as Record<string, string>)[
                        advancementsData[key].title
                      ]
                    }
                  </p>
                  <p className="text-center text-xs">
                    {
                      (fi_FI as Record<string, string>)[
                        advancementsData[key].title
                      ]
                    }
                  </p>
                </>
              )}
            </div>
          );
        })}
      {children}
    </div>
  );
};

export default Advancements;
