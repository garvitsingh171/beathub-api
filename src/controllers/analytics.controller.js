const analyticsService = require("../services/analytics.service");
const asyncHandler = require("../utils/asyncHandler");

const getTopUsersController = asyncHandler(async (req, res) => {
    const topUsers = await analyticsService.getTopUsersByPlaylistCount();

    res.status(200).json({
        success: true,
        data: topUsers,
    });
});

module.exports = {
    getTopUsersController,
};