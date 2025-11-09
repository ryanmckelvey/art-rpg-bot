//TODO: Post the artwork to the review channel for moderation, maybe take the Image URL, User, and Review Channel ID as parameters, call a method on the 
//      index to use the client to post.
// Post using the raw discord API as Client is a bit messy to export.
import { POST_TO_ARTWORK_REVIEW_MESSAGE } from '../../const/messages.js';
import { postToChannel } from '../utils.js';
export const postArtToReviewChannel = async (artworkUrl, userId) => {
    const reviewChannelId = process.env.ART_REVIEW_CHANNEL_ID;
    const content = POST_TO_ARTWORK_REVIEW_MESSAGE(userId, artworkUrl);
    postToChannel(reviewChannelId, content);
}