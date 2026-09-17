import User from '../models/userModel.js';
import Profile from '../models/profileModel.js';
import Interview from '../models/interview.model.js';
import {cloudinary} from '../config/cloudinary.js';

/**
 * @desc    Fetch aggregated account & profile details
 * @route   GET /api/v1/user/account/details
 * @access  Private
 */
export const getAccountDetails = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;

        // Fetch user and profile in parallel for maximum speed
        const [user, profile] = await Promise.all([
            User.findById(userId).select('-password'),
            Profile.findOne({ user: userId })
        ]);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User account not found.' });
        }

        return res.status(200).json({
            success: true,
            account: {
                userId: user._id,
                fullName: `${user.firstName} ${user.lastName}`.trim(),
                username: user.username,
                email: user.email,
                credits: user.credits ?? 3,
                memberSince: user.createdAt,
                accountRole: 'Candidate / Developer',
                accountStatus: 'Verified & Active',
                avatarUrl: profile?.avatar?.url || '',
                location: profile?.location || 'Not Specified',
                title: profile?.title || 'Software Engineer'
            }
        });
    } catch (error) {
        console.error('❌ [getAccountDetails Error]:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve account details.',
            error: error.message
        });
    }
};

/**
 * @desc    Permanently delete user account and cascade delete all assets
 * @route   DELETE /api/v1/user/account/delete
 * @access  Private
 */
export const deleteAccount = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized session.' });
        }

        // STEP 1: Find User and Profile
        const [user, profile] = await Promise.all([
            User.findById(userId),
            Profile.findOne({ user: userId })
        ]);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User does not exist.' });
        }

        // STEP 2: Purge Avatar from Cloudinary if a custom asset exists
        if (profile?.avatar?.public_id) {
            try {
                console.log(`🗑️ Deleting Cloudinary asset: ${profile.avatar.public_id}`);
                await cloudinary.uploader.destroy(profile.avatar.public_id);
            } catch (cloudErr) {
                console.warn('⚠️ Cloudinary file cleanup warning:', cloudErr.message);
            }
        }

        // STEP 3: Cascade Delete MongoDB Resources in Parallel
        await Promise.all([
            // 1. Delete all Mock Interview sessions for this user
            Interview.deleteMany({ userId }),

            // 2. Delete Profile document
            Profile.findOneAndDelete({ user: userId }),

            // 3. Delete Master User account
            User.findByIdAndDelete(userId)
        ]);

        console.log(`✅ User ${userId} and all related documents permanently purged.`);

        // STEP 4: Clear Auth Cookies (if using HTTP-only cookies)
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return res.status(200).json({
            success: true,
            message: 'Account and all associated telemetry records permanently removed.'
        });
    } catch (error) {
        console.error('❌ [deleteAccount Error]:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Critical error while deleting account.',
            error: error.message
        });
    }
};