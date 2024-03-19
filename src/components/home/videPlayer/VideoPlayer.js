import React from "react";
import YouTube from "react-youtube";
function VideoPlayer({ trailerKey }) {
  return (
    <YouTube
      videoId={trailerKey}
      opts={{
        width: "560",
        height: "415",
      }}
    />
  );
}

export default VideoPlayer;
