import { useState, useMemo, useEffect } from 'react';

const isVideo = (url) => {
  try {
    const pathname = new URL(url).pathname;
    return pathname.endsWith('.mp4');
  } catch {
    return false;
  }
};

export const useGameMedia = (game) => {
  const allMedia = useMemo(() => {
    if (!game) return [];
    return [
      ...(game.movies || []),
      ...(game.screenshots || []),
    ];
  }, [game]);

  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    if (game) {
      setSelectedMedia(game.movies?.[0] || game.header_image || null);
    }
  }, [game]);

  return {
    allMedia,
    selectedMedia,
    setSelectedMedia,
    isVideo,
  };
};
