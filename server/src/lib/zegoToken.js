
import jwt from 'jsonwebtoken'



const generateZegoToken =  (roomId,userId,expiresInSeconds = 3600, Privilage = {1:1,2:1}) => {
    const payload = {
        app_id: process.env.ZEGO_APP_ID,
        room_id: roomId,
        user_id: userId,
        privilege: Privilage,
        expire: (Date.now() / 1000 + expiresInSeconds).toFixed(0),
      };
      return jwt.sign(payload, process.env.ZEGO_SERVER_SECRET, { algorithm: 'HS256' });
    }

export default generateZegoToken