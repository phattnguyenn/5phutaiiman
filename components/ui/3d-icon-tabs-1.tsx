"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const tabs = [
  {
    id: 0,
    label: "Homes",
    video_url:
      "https://a0.muscache.com/videos/search-bar-icons/webm/house-selected.webm",
    initial_render_url:
      "https://a0.muscache.com/videos/search-bar-icons/webm/house-twirl-selected.webm",
  },
  {
    id: 1,
    label: "Experiences",
    video_url:
      "https://a0.muscache.com/videos/search-bar-icons/webm/balloon-selected.webm",
    initial_render_url:
      "https://a0.muscache.com/videos/search-bar-icons/webm/balloon-twirl.webm",
  },
  {
    id: 2,
    label: "Services",
    video_url:
      "https://a0.muscache.com/videos/search-bar-icons/webm/consierge-selected.webm",
    initial_render_url:
      "https://a0.muscache.com/videos/search-bar-icons/webm/consierge-twirl.webm",
  },
];

function NewBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-t-full rounded-br-full rounded-bl-sm bg-primary px-2 py-1 text-xs font-bold text-primary-foreground transition-all duration-200 before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded-[inherit] before:content-[''] before:shadow-[inset_0_0_0_1px_rgba(170,202,255,0.2),inset_0_0_10px_0_rgba(170,202,255,0.3),inset_0_3px_7px_0_rgba(170,202,255,0.4),inset_0_-4px_3px_0_rgba(170,202,255,0.4),0_1px_3px_0_rgba(0,0,0,0.50),0_4px_12px_0_rgba(0,0,0,0.65)] backdrop-blur-md",
        className
      )}
    >
      <span>NEW</span>
      <span
        className="absolute left-1/2 z-50 translate-y-2.5 scale-y-[-1] -translate-x-1/2 opacity-40"
        style={{
          maskImage: "linear-gradient(to top, white 20%, transparent 50%)",
          WebkitMaskImage:
            "linear-gradient(to top, white 10%, transparent 50%)",
        }}
      >
        NEW
      </span>
    </div>
  );
}

function Component({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState(0);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [tabClicked, setTabClicked] = useState(false);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, tabs.length);
  }, []);

  const handleTabClick = (newTabId: number) => {
    setTabClicked(true);
    if (newTabId !== activeTab) {
      setActiveTab(newTabId);
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });

      const videoElement = videoRefs.current[newTabId];
      if (videoElement) {
        videoElement.currentTime = 0;
        void videoElement.play();
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className={cn("flex space-x-8 rounded-full", className)}>
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            whileTap="tapped"
            whileHover="hovered"
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "relative flex cursor-pointer items-center gap-2 px-2 tracking-[0.01em] text-neutral-600 transition focus-visible:outline-1 focus-visible:outline-none focus-visible:ring-1 dark:text-neutral-300",
              activeTab === tab.id
                ? "tracking-normal font-medium text-black dark:text-white"
                : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
            )}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className="absolute bottom-0 left-0 z-10 h-1 w-full rounded-full bg-black dark:bg-white"
                transition={{ type: "spring", bounce: 0.19, duration: 0.4 }}
              />
            )}
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: {
                  type: "spring",
                  bounce: 0.2,
                  damping: 7,
                  duration: 0.4,
                  delay: index * 0.1,
                },
              }}
              variants={{
                default: { scale: 1 },
                ...(!(activeTab === tab.id) && { hovered: { scale: 1.1 } }),
                ...(!(activeTab === tab.id) && {
                  tapped: {
                    scale: 0.8,
                    transition: {
                      type: "spring",
                      bounce: 0.2,
                      damping: 7,
                      duration: 0.4,
                    },
                  },
                }),
              }}
              className="relative"
              transition={{ type: "spring" }}
            >
              {tab.id !== 0 && (
                <NewBadge className="absolute -right-8 -top-2 z-50" />
              )}

              <div className="relative size-20">
                <video
                  key={`initial-${tab.id}`}
                  ref={(el) => {
                    if (el) videoRefs.current[tab.id] = el;
                  }}
                  muted
                  playsInline
                  autoPlay
                  className={cn("absolute", tabClicked ? "opacity-0" : "opacity-100")}
                >
                  <source src={tab.initial_render_url} type="video/webm" />
                </video>
                <video
                  key={`clicked-${tab.id}`}
                  ref={(el) => {
                    if (el) videoRefs.current[tab.id] = el;
                  }}
                  muted
                  playsInline
                  autoPlay
                  className={cn("absolute", tabClicked ? "opacity-100" : "opacity-0")}
                >
                  <source src={tab.video_url} type="video/webm" />
                </video>
              </div>
            </motion.div>
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export { Component };
