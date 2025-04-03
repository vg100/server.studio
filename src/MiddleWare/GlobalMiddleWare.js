const Jwt = require('jsonwebtoken');
const User = require('../Modals/user.modal');

class GlobalMiddleWare {
    static authenticate(allowedRoles = []) {
        return async (req, res, next) => {
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader || !authHeader.startsWith('Bearer ')) {
                    return res.status(401).json({ message: 'Authorization token missing or invalid' });
                }
                const token = authHeader.split(' ')[1];
                const decoded = Jwt.verify(token, 'studio');

                if (!decoded) {
                    return res.status(401).json({ message: 'User Not Authorised' });
                }

                if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
                    return res.status(403).json({ message: 'Access Denied: Insufficient Permissions' });
                }
                req.user = decoded;
                next();
            } catch (error) {
                return res.status(401).json({ message: 'Invalid token', error: error.message });
            }
        };
    }
    static checkPermissions(requiredPermissions = []) {
        return async (req, res, next) => {
            try {
                const user = await User.findById(req.user?.userId);

                const userPermissions = user.permissions || {};
                const missingPermissions = requiredPermissions.filter(permission => !userPermissions[permission]);

                if (missingPermissions.length > 0) {
                    return res.status(403).json({
                        message: "Access Denied",
                        missingPermissions: missingPermissions,
                    });
                }
                next();
            } catch (error) {
                return res.status(401).json({ message: 'Invalid token', error: error.message });
            }
        };
    }
}

module.exports = GlobalMiddleWare;
