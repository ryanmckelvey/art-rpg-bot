//TODO: Post the artwork to the review channel for moderation, maybe take the Image URL, User, and Review Channel ID as parameters, call a method on the 
//      index to use the client to post.
// Post using the raw discord API as Client is a bit messy to export.
import { postToChannel } from '../utils.js';
export const postArtToReviewChannel = async (artworkUrl, userId) => {
    const reviewChannelId = process.env.ART_REVIEW_CHANNEL_ID;
    const content_ = `{
    "flags": 32768,
    "components": [
        {
            "type": 10,
            "content": "New artwork submitted by <@${userId}> for review: ${artworkUrl}"
        },
        {
            "type": 12,
            "items": [
                {
                    "media": {
                        "url": "${artworkUrl}"
                    }
                }
            ]
        },
        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "custom_id": "approve_button",
                    "label": "Approve ✅",
                    "style": 1
                },
                {
                    "type": 2,
                    "custom_id": "reject_button",
                    "label": "Reject ❌",
                    "style": 1
                }
            ]
        }
    ]
}`;
    postToChannel(reviewChannelId, content_);
}