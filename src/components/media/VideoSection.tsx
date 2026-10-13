'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/languageContext';
import { videoGalleryData } from '@/data/media';
import { Play, Clock, Calendar, Check } from 'lucide-react';

const playableVideos = videoGalleryData.filter((video) => video.videoPath);

export function VideoSection() {
  const { t, dict } = useLanguage();

  const [selectedVideo, setSelectedVideo] = useState(
    () => playableVideos[0] ?? videoGalleryData[0],
  );
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [hasPlaybackError, setHasPlaybackError] = useState(false);

  return (
    <div className="space-y-8">

      {/* Featured Video Player Area */}
      <div className="bg-[#151210] rounded-3xl overflow-hidden border h-full border-[#2B2521] text-white">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

          {/* ================= VIDEO PLAYER ================= */}
          <div className="lg:col-span-8 relative aspect-[16/9] w-full bg-black">

            {isPlayerOpen && selectedVideo.videoPath && !hasPlaybackError ? (
              /* ACTUAL VIDEO */
              <video
                key={selectedVideo.videoPath}
                src={selectedVideo.videoPath}
                controls
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => {
                  setHasPlaybackError(true);
                  setIsPlayerOpen(false);
                }}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              /* Frame preview from the selected video */
              <>
                {selectedVideo.videoPath && (
                  <video
                    key={`preview-${selectedVideo.videoPath}`}
                    src={selectedVideo.videoPath}
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    tabIndex={-1}
                    onLoadedMetadata={(event) => {
                      const video = event.currentTarget;
                      video.currentTime = video.duration > 1 ? 1 : 0;
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">

                  {selectedVideo.videoPath ? (
                    <button
                      type="button"
                      onClick={() => {
                        setHasPlaybackError(false);
                        setIsPlayerOpen(true);
                      }}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F5660A] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition"
                      aria-label="Play video"
                    >
                      <Play className="w-7 h-7 sm:w-9 sm:h-9 ml-1 fill-white" />
                    </button>
                  ) : (
                    <p
                      role="status"
                      className="max-w-xs rounded-lg bg-[#151210]/85 px-4 py-3 text-center text-sm text-white"
                    >
                      {hasPlaybackError
                        ? dict.mediaSection.videoPlaybackError
                        : dict.mediaSection.videoUnavailable}
                    </p>
                  )}

                </div>

                {hasPlaybackError && selectedVideo.videoPath && (
                  <p
                    role="alert"
                    className="absolute bottom-14 left-1/2 -translate-x-1/2 rounded-lg bg-[#151210]/85 px-4 py-2 text-center text-sm text-white"
                  >
                    {dict.mediaSection.videoPlaybackError}
                  </p>
                )}

                {/* Video Meta */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#D4CCC0]">

                  <div className="flex items-center gap-2 bg-[#151210]/80 backdrop-blur-xs px-3 py-1 rounded-md">
                    <Clock className="w-3.5 h-3.5 text-[#F5660A]" />
                    <span>{selectedVideo.duration}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-[#151210]/80 backdrop-blur-xs px-3 py-1 rounded-md">
                    <Calendar className="w-3.5 h-3.5 text-[#F5660A]" />
                    <span>{t(selectedVideo.date)}</span>
                  </div>

                </div>
              </>
            )}

          </div>

          {/* ================= DETAILS SIDEBAR ================= */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#2B2521] bg-[#1A1614]">

            <div className="space-y-4">

              <div className="text-xs uppercase font-bold tracking-[0.2em] text-[#F5660A]">
                {dict.mediaSection.featuredVideoBadge}
              </div>

              <h3 className="font-editorial text-xl font-bold text-white leading-snug">
                {t(selectedVideo.title)}
              </h3>

              <p className="text-sm text-[#A89F95] leading-relaxed">
                {t(selectedVideo.description)}
              </p>

            </div>

            {/* Bottom Info */}
            <div className="pt-6 border-t border-[#2B2521] text-xs text-[#8A8177]">
              <span>{dict.mediaSection.videoSourceNote}</span>
            </div>

          </div>

        </div>
      </div>

      {/* ================= VIDEO PLAYLIST ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {playableVideos.map((video) => {

          const isCurrent = video.id === selectedVideo.id;

          return (
            <button
              key={video.id}
              type="button"
              onClick={() => {
                setSelectedVideo(video);
                setIsPlayerOpen(false);
                setHasPlaybackError(false);
              }}
              className={`text-left p-3 rounded-2xl border transition flex gap-3.5 items-center ${
                isCurrent
                  ? 'bg-white border-[#F5660A] shadow-xs'
                  : 'bg-white border-[#E8E2D8] hover:border-[#F5660A]/50'
              }`}
            >

              {/* Frame preview from the video */}
              <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-[#E8E2D8]">
                {video.videoPath && (
                  <video
                    src={video.videoPath}
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    tabIndex={-1}
                    onLoadedMetadata={(event) => {
                      const preview = event.currentTarget;
                      preview.currentTime = preview.duration > 1 ? 1 : 0;
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-white text-white" />
                </div>

              </div>

              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-semibold text-[#151210]">
                  {t(video.title)}
                </p>
                <p className="mt-1 text-xs text-[#6B625A]">{video.duration}</p>
                {!video.videoPath && (
                  <p className="mt-1 text-xs text-[#8A8177]">
                    {dict.mediaSection.videoUnavailable}
                  </p>
                )}
              </div>

              {/* Selected Check */}
              {isCurrent && (
                <div className="w-5 h-5 rounded-full bg-[#F5660A] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
              )}

            </button>
          );

        })}

      </div>

    </div>
  );
}
