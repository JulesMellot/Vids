export interface VideoDetails {
    id: string;
    title: string;
    description: string;
    thumbnails: { url: string; width: number; height: number }[];
    author: { id: string; name: string; thumbnails: { url: string }[] };
    views: { text: string };
    published: { text: string };
    // ... other fields from youtubei.js
}

export const fetchVideoDetails = async (videoId: string): Promise<any> => {
    const response = await fetch(`http://localhost:3001/api/youtube/video/${videoId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch video details');
    }
    return response.json();
};

export const searchVideos = async (query: string): Promise<any> => {
    const response = await fetch(`http://localhost:3001/api/youtube/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error('Failed to search videos');
    }
    return response.json();
};
