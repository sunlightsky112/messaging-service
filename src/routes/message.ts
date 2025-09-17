import { Router, Request, Response } from 'express';
// import { v4 as uuidv4 } from 'uuid';
import { Message } from '../models/message';
import { messages, users } from '../store/memory';

const router = Router();

/**
 * GET /messages
 * Retrieve all messages
 */

router.get('/messages', (req: Request, res: Response) => {
    const filteredMessages = messages.filter(message => message.messenger_id = req.body.messenger_id);
    res.status(200).json({ data: filteredMessages });
});

/**
 * POST /users/:userId/messages
 * Create a new message for a recipient
 */
router.post('/users/:userId/messages', (req: Request, res: Response) => {
    const { userId } = req.params;
    const { messenger_id, title, content } = req.body;

    // Validate recipient exists
    if (!userId || !users.includes(userId)) {
        return res.status(400).json({ error: 'Recipient not found' });
    }

    // Validate sender
    if (!messenger_id || !users.includes(messenger_id)) {
        return res.status(400).json({ error: 'Invalid messenger_id' });
    }

    // Validate content
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    // Create and store the message
    const message: Message = {
        id: Date.now().toString(), // Simple unique ID generation
        messenger_id,
        receipient_id: userId,
        title,
        content
    };
    messages.push(message);
    
    res.status(201).json({ data: message });
});

export default router;