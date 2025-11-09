export const POST_TO_ARTWORK_REVIEW_MESSAGE = (userId, artworkUrl) =>
  `{
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

export const ARTWORK_REVIEWED_MESSAGE = (userId, modId, artworkUrl, approvalStatus) =>{
    `{
    "flags": 32768,
    "components": [
        {
            "type": 10,
            "content": "Artwork submitted by <@${userId}>: ${artworkUrl} | Has been ${approvalStatus} by ${modId}"
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
        }
    ]
}`;
}