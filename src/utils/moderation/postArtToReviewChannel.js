//TODO: Post the artwork to the review channel for moderation, maybe take the Image URL, User, and Review Channel ID as parameters, call a method on the 
//      index to use the client to post.
// Post using the raw discord API as Client is a bit messy to export.
import { postToChannel } from '../utils.js';
export const postArtToReviewChannel = async (artworkUrl, userId) => {
    const reviewChannelId = process.env.ART_REVIEW_CHANNEL_ID;
    const content = `New artwork submitted by <@${userId}> for review: ${artworkUrl}`;
    console.log(`Posting to review channel ${reviewChannelId}: ${content}`);
    postToChannel(reviewChannelId, content);
}