const User = require("../Modals/user.modal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
    static async createUser(req, res, next) {
        try {
            const { name, email, permissions, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const brokerData = {
                name,
                email,
                password: hashedPassword,
                role: req.body.role || 'broker',
                permissions: {
                    canCreateOrders: !!permissions?.canCreateOrders,
                    canEditOrders: !!permissions?.canEditOrders,
                    canDeleteOrders: !!permissions?.canDeleteOrders,
                }
            };

            const newBroker = await User.create(brokerData);
            res.status(201).json({
                success: true,
                message: 'Account created successfully.',
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success: false, message: "Invalid email or password." });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: "Invalid email or password." });
            }
            const token = jwt.sign({ userId: user._id, role: user.role }, "studio", { expiresIn: "7d" });
            res.status(200).json({
                success: true,
                message: "Login successful.",
                token,
                role: user.role,
                id: user._id
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAllUser(req, res, next) {
        try {
            const users = await User.find().select("-password");
            res.status(200).json({ success: true, data: users });
        } catch (error) {
            next(error);
        }
    }

    static async getProfile(req, res, next) {
        try {
            const userId = req.user.userId;
            const user = await User.findById(userId).select("-password");
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            res.status(200).json({ success: true, data: user });
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
        try {
            const loggedInUserId = req.user?.userId;
            const { userId: targetUserId, name, role, permissions } = req.body;
    
            const loggedInUser = await User.findById(loggedInUserId);
            if (!loggedInUser) {
                return res.status(404).json({ success: false, message: "Logged-in user not found" });
            }
            let userToUpdate;
            if (loggedInUser.role === "admin" && targetUserId) {
                // Admin can update their own details OR any broker using `userId`
                userToUpdate = await User.findById(targetUserId);
            } else {
                // Broker can only update their own details
                userToUpdate = await User.findById(loggedInUserId);
            }
    
            if (!userToUpdate) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
    
            // Update name (Allowed for both admin & broker)
            if (name) userToUpdate.name = name;
    
            // Only Admin can update Role & Permissions
            if (loggedInUser.role === "admin") {
                if (role) userToUpdate.role = role;
                if (permissions) {
                    userToUpdate.permissions.canCreateTasks = !!permissions.canCreateTasks;
                    userToUpdate.permissions.canEditTasks = !!permissions.canEditTasks;
                }
            }
    
            await userToUpdate.save();
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: userToUpdate
            });
    
        } catch (error) {
            next(error);
        }
    }
    
    
}

module.exports = UserController;
