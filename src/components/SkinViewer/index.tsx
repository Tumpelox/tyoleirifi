"use client";

import {
  BetterIdle,
  BetterFlying,
  BetterIdle2,
  BetterIdle3,
} from "./Animations";
import elytra from "./textures/elytra.png";
import { useState } from "react";
import Skinview3d from "./Skinview3d";
import { PlayerAnimation } from "skinview3d";

interface SkinViewProps {
  skin?: string;
  cape?: string | null;
  children?: React.ReactNode;
  type?: "default" | "fly" | "gaze";
  priority?: "0" | "1" | "2" | "3";
  positioning?: "0" | "1" | "2" | "3";
  controls?: boolean;
  className?: string;
}

interface Variant {
  height: number;
  width: number;
  backEquipment?: "cape" | "elytra" | undefined;
  animation?: () => PlayerAnimation | null;
  positioning?: {
    "0": [number, number, number];
    "1": [number, number, number];
    "2": [number, number, number];
    "3": [number, number, number];
  };
  zoomLevels?: {
    "0": number;
    "1": number;
    "2": number;
    "3": number;
  };
}

const SkinView = ({
  skin = "",
  cape = null,
  children,
  type = "default",
  priority = "0",
  positioning = "0",
  controls = false,
  className = "",
}: SkinViewProps) => {
  const [toggleControl, setToggleControl] = useState(false);
  const variants: Record<string, Variant> = {
    default: {
      height: 300,
      width: 150,
      backEquipment: "cape",
      animation: () => {
        if (priority === "1") {
          return new BetterIdle();
        } else if (priority === "2") {
          return new BetterIdle2();
        } else if (priority === "3") {
          return new BetterIdle3();
        } else return null;
      },
      positioning: {
        "0": [-5.66, -5.29, 32.94],
        "1": [-5.66, -5.29, 32.94],
        "2": [12.66, -5.29, 45.94],
        "3": [-5.66, -5.29, 45.94],
      },
      zoomLevels: {
        "0": 0.9,
        "1": 0.9,
        "2": 0.8,
        "3": 0.6,
      },
    },
    fly: {
      height: 120,
      width: 300,
      backEquipment: "elytra",
      animation: () => new BetterFlying(),
      zoomLevels: {
        "0": 1.3,
        "1": 1.3,
        "2": 0.9,
        "3": 0.75,
      },
      positioning: {
        "0": [-5.66, -19.29, 32.94],
        "1": [-5.66, -19.29, 32.94],
        "2": [12.66, -30.29, 45.94],
        "3": [-5.66, -50.29, 45.94],
      },
    },
    gaze: {
      height: 300,
      width: 150,
    },
  };

  const order = {
    "1": "order-1 sm:order-2",
    "2": "order-2 sm:order-last",
    "3": "order-3 sm:order-1",
    "0": "",
  };

  return (
    <div
      className={`relative flex flex-col items-center ${className} ${order[priority]}`}
    >
      <div
        className={`${toggleControl ? "hidden" : "absolute"} h-full w-full`}
      ></div>
      <Skinview3d
        skinUrl={`/api/pelaajat/profile/skin?url=${encodeURIComponent(skin)}`}
        className={`h-auto! max-w-full! mx-auto w-[initial]! max-h-80`}
        height={variants[type].height}
        width={variants[type].width}
        onReady={(viewer) => {
          if (cape && variants[type].backEquipment === "cape") {
            viewer.loadCape(cape, {
              backEquipment: variants[type]?.backEquipment,
            });
          }

          if (variants[type].backEquipment === "elytra") {
            viewer.loadCape(elytra, {
              backEquipment: variants[type].backEquipment,
            });
          }

          if (variants[type]?.positioning !== undefined) {
            const cameraPosition = variants[type].positioning[positioning];
            viewer.camera.position.set(...cameraPosition);
          }

          if (variants[type]?.zoomLevels !== undefined)
            viewer.zoom = variants[type].zoomLevels[priority];

          if (variants[type]?.animation !== undefined) {
            viewer.animation = variants[type].animation();
          }

          viewer.render();
        }}
      />
      <button
        onClick={() => setToggleControl(!toggleControl)}
        title="Tarkastele skiniä"
        className={`${!controls && "hidden"} ${
          toggleControl && "bg-current"
        } absolute z-10 bottom-2 right-2 rounded-full p-1`}
      >
        <div
          className={`${
            toggleControl && "text-white dark:text-[#141414]"
          } flex gap-1 items-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
            />
          </svg>
        </div>
      </button>

      {children}
    </div>
  );
};

export default SkinView;
