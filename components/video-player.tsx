export function VideoPlayer({ provider, videoId }: { provider: string; videoId: string }) {
    if (!videoId) return <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-500">動画がありません</div>

    if (provider === 'vimeo') {
        return (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                <iframe
                    src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                    allow="autoplay; fullscreen; picture-in-picture"
                    className="absolute top-0 left-0 h-full w-full"
                    title="Video"
                />
            </div>
        )
    }

    if (provider === 'youtube') {
        return (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="absolute top-0 left-0 h-full w-full"
                    title="Video"
                />
            </div>
        )
    }

    return (
        <div className="aspect-video bg-gray-900 flex items-center justify-center text-white">
            Unsupported Provider: {provider}
        </div>
    )
}
