import { db } from "../db/db.js";
import { feedback } from "../db/schema.js";

export const getFeedback = async (req, res) => {
    try {
        const feedbackList = await db.select().from(feedback).orderBy('createdAt desc').limit(5).execute();
        return res.status(200).json(feedbackList);
    } catch (error) {
        console.error("Error fetching feedback:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const postFeedback = async (req, res) => {
    try {
        const { avatarlink, fullname, userid } = req.body.user;
        const { comment } = req.body;
        const newFeedback = await db.insert(feedback).values({
            avatarlink: avatarlink,
            fullname: fullname,
            userid: userid,
            comment: comment
        }).execute();
        return res.status(201).json(newFeedback);
    } catch (error) {
        console.error("Error posting feedback:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
