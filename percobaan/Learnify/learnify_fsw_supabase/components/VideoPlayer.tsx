"use client";
import type { Video } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

const VideoPlayer = ({ videoList }: { videoList: Video[] }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Load the video
    }
  }, [videoUrl]);
  return (
    <div className="flex w-full justify-center my-4 gap-x-4">
      <div className="grid grid-cols-1 cursor-pointer">
        {videoList.map((videos) => (
          <div
            onClick={() => setVideoUrl(videos.Url_path)}
            key={videos.VideoID}
          >
            {videos.Title_Video}
          </div>
        ))}
      </div>
      <div>
        <video ref={videoRef} controls width="70%">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
