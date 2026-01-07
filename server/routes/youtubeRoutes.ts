import { Router, type Request, type Response } from 'express';
import youtubeService from '../services/youtubeService';

const router = Router();

// GET /api/youtube/video/:id
router.get('/video/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const details = await youtubeService.getVideoDetails(id);
        res.json(details);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/youtube/trending
router.get('/trending', async (_req: Request, res: Response) => {
    try {
        const trending = await youtubeService.getTrending();
        res.json(trending);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/youtube/search?q=...&type=...
router.get('/search', async (req: Request, res: Response) => {
    try {
        const { q, type } = req.query;
        if (!q) {
            return res.status(400).json({ error: 'Missing query parameter q' });
        }
        const results = await youtubeService.search(q as string, {
            type: type as 'video' | 'channel' | 'playlist'
        });
        res.json(results);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/youtube/channel/:id
router.get('/channel/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const channel = await youtubeService.getChannel(id);
        res.json(channel);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
