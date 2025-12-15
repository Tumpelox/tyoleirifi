import React, { useRef, useEffect } from "react";
import { SkinViewer } from "skinview3d";

interface Skinview3dProps {
  className?: string;
  width: number;
  height: number;
  skinUrl: string;
  capeUrl?: string;
  onReady?: (viewer: SkinViewer) => void;
}

const Skinview3d = ({
  className,
  width,
  height,
  skinUrl,
  capeUrl,
  onReady,
}: Skinview3dProps) => {
  const canvasRef = useRef();
  const skinviewRef = useRef<SkinViewer>();

  useEffect(() => {
    const viewer = new SkinViewer({
      canvas: canvasRef.current,
      width: width,
      height: height,
    });
    if (skinUrl) viewer.loadSkin(skinUrl);
    if (capeUrl) viewer.loadCape(capeUrl);
    skinviewRef.current = viewer;
    if (onReady) {
      onReady(viewer);
    }
  });

  useEffect(() => {
    if (skinviewRef.current && skinUrl) skinviewRef.current.loadSkin(skinUrl);
  }, [skinUrl]);

  useEffect(() => {
    if (skinviewRef.current && capeUrl) skinviewRef.current.loadCape(capeUrl);
  }, [capeUrl]);

  useEffect(() => {
    if (skinviewRef.current) skinviewRef.current.setSize(width, height);
  }, [width, height]);
  return React.createElement("canvas", {
    className: className,
    ref: canvasRef,
    style: { imageRendering: "pixelated" },
  });
};

export default Skinview3d;
