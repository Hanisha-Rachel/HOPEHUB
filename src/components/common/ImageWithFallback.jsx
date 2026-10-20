import React, { useState } from 'react';
import { HeartHandshake } from 'lucide-react';

/**
 * ImageWithFallback
 * Displays an image with a smooth loading state and an automatic
 * branded fallback if the network or external URL fails.
 */
export default function ImageWithFallback({
  src,
  alt = 'HopeHub imagery',
  className = '',
  aspectRatio = 'aspect-video',
  overlay = false,
  overlayText = '',
  tag = '',
  tagColor = 'bg-hope-orange text-white'
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className} bg-slate-100 group`}>
      {/* Loading Skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-teal-50 to-slate-200 animate-pulse" />
      )}

      {/* Fallback Graphic */}
      {error ? (
        <div className="absolute inset-0 bg-gradient-to-br from-hope-light-teal to-teal-100 flex flex-col items-center justify-center p-6 text-center text-hope-teal-800">
          <div className="w-14 h-14 rounded-full bg-white/80 shadow-sm flex items-center justify-center mb-3">
            <HeartHandshake className="w-8 h-8 text-hope-teal" />
          </div>
          <span className="text-sm font-semibold text-hope-teal-800">{alt}</span>
          <span className="text-xs text-hope-teal-600 mt-1">HOPEHUB Community Impact</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        />
      )}

      {/* Optional Tag badge */}
      {tag && (
        <div className="absolute top-3 left-3 z-10">
          <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md ${tagColor}`}>
            {tag}
          </span>
        </div>
      )}

      {/* Optional Gradient Overlay with Text */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-hope-charcoal/90 via-hope-charcoal/30 to-transparent flex items-end p-6">
          {overlayText && (
            <p className="text-white font-semibold text-lg drop-shadow-md">
              {overlayText}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
