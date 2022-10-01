import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ src }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.controls = true;
        const defaultOptions = {};
        if (video.canPlayType("application/vnd.apple.mpegurl")) {
            // This will run in safari, where HLS is supported natively
            video.src = src;
        } else if (Hls.isSupported()) {
            // This will run in all other modern browsers
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
        } else {
            console.error(
                "This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
            );
        }
    }, [src, videoRef]);

    return (
        <div className="w-full lg:w-[max(675px,calc(100vw-37%))] h-max lg:rounded-[1em] bg-[#1c1f31]">
            <video
                ref={videoRef}
                className="w-full lg:rounded-[1em] outline-none"
            />
        </div>
    );
}
