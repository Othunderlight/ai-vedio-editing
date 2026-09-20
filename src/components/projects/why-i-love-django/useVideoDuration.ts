import { useEffect, useState } from "react";
import { continueRender, delayRender, staticFile } from "remotion";

export const useVideoDuration = (src: string): number | null => {
  const [duration, setDuration] = useState<number | null>(null);
  const [handle] = useState(() => delayRender("Loading video duration"));

  useEffect(() => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = staticFile(src);

    video.onloadedmetadata = () => {
      setDuration(video.duration);
      continueRender(handle);
    };

    video.onerror = () => {
      continueRender(handle);
    };
  }, [src, handle]);

  return duration;
};
