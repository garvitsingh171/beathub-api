const analyticsService = require("../services/analytics.service");

const getTopUsersController = async (req, res) => {
    try {
        const topUsers = await analyticsService.getTopUsersByPlaylistCount();

        res.status(200).json({
            success: true,
            data: topUsers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching analytics",
            error: error.message,
        });
    }
};

module.exports = {
    getTopUsersController,
};