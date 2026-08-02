import Interview from "../models/interview.model.js";
import Profile from "../models/profileModel.js";

class InterviewService {
  async createScheduledInterview(userId, payload) {
    // 1. Check if user's profile exists
    let profile = await Profile.findOne({ user: userId });

    // 2. Create the interview document
    const newInterview = await Interview.create({
      userId,
      profileId: profile?._id || null,
      ...payload,
    });

    // 3. Sync ID into Profile's interviews array
    if (profile) {
      await Profile.findByIdAndUpdate(profile._id, {
        $push: { interviews: newInterview._id },
      });
    }

    return newInterview;
  }
}

export default new InterviewService();