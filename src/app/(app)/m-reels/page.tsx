
'use client';

import { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Send, MoreVertical, Volume2, VolumeX } from "lucide-react";
import { cn } from '@/lib/utils';

const mockReelsData = [
  {
    id: 1,
    user: {
      name: "alex.dev",
      avatar: "https://placehold.co/40x40.png"
    },
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    caption: "Seharian ngoding buat fitur baru! 💻 #programmerlife #coding #gigconnect",
    likes: 123,
    comments: 12,
  },
  {
    id: 2,
    user: {
      name: "creative.jane",
      avatar: "https://placehold.co/40x40.png"
    },
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    caption: "Tips & trik desain pakai Figma, dijamin produktif! ✨ #figma #desain #uiux",
    likes: 456,
    comments: 45,
  },
  {
    id: 3,
    user: {
      name: "uiux.guru",
      avatar: "https://placehold.co/40x40.png"
    },
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    caption: "Lifehacks buat para freelancer biar tetap waras. Wajib coba! #freelance #wfh #lifehacks",
    likes: 789,
    comments: 102,
  },
];


export default function MReelsPage() {
  const [reels, setReels] = useState(mockReelsData.map(reel => ({ ...reel, isLiked: false, isMuted: true })));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleLike = (id: number) => {
    setReels(reels.map(reel => {
      if (reel.id === id) {
        return { ...reel, isLiked: !reel.isLiked, likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1 };
      }
      return reel;
    }));
  };

  const toggleMute = (id: number, index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.muted = !video.muted;
      setReels(currentReels => currentReels.map(reel =>
        reel.id === id ? { ...reel, isMuted: video.muted } : reel
      ));
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-headline font-bold">M-Reels</h1>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-sm flex flex-col items-center gap-12">
          {reels.map((reel, index) => (
            <Card key={reel.id} className="w-full rounded-xl overflow-hidden shadow-lg relative cursor-pointer" onClick={() => toggleMute(reel.id, index)}>
              {/* Header */}
              <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/50 to-transparent">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={reel.user.avatar} alt={reel.user.name} data-ai-hint="profile picture" />
                    <AvatarFallback>{reel.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-bold text-sm text-white">{reel.user.name}</span>
                </div>
                <Button variant="ghost" size="icon" className="text-white">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>

              {/* Video Player */}
              <div className="relative w-full aspect-[9/16] bg-secondary">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={reel.videoUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  {reel.isMuted ? <VolumeX className="h-6 w-6 text-white" /> : <Volume2 className="h-6 w-6 text-white" />}
                </div>
              </div>
              
              {/* Actions & Caption */}
              <div className="absolute bottom-0 left-0 w-full p-4 z-10 bg-gradient-to-t from-black/50 to-transparent">
                  <div className="flex justify-between items-end">
                      <div className="text-white max-w-[calc(100%-4rem)]">
                          <p className="text-sm">
                              <span className="font-bold">{reel.user.name}</span> {reel.caption}
                          </p>
                      </div>
                      <div className="flex flex-col items-center gap-4">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-white h-10 w-10 flex flex-col hover:bg-white/20 focus-visible:bg-white/20 active:bg-white/30"
                            onClick={(e) => { e.stopPropagation(); handleLike(reel.id); }}
                          >
                              <Heart className={cn("h-6 w-6", reel.isLiked && "fill-primary text-primary")} />
                              <span className="text-xs">{reel.likes}</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="text-white h-10 w-10 flex flex-col hover:bg-white/20 focus-visible:bg-white/20 active:bg-white/30">
                              <MessageCircle className="h-6 w-6" />
                              <span className="text-xs">{reel.comments}</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="text-white h-10 w-10 hover:bg-white/20 focus-visible:bg-white/20 active:bg-white/30">
                              <Send className="h-6 w-6" />
                          </Button>
                      </div>
                  </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

    