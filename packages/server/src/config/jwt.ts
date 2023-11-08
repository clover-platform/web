import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET } from "@/auth/auth.config";

export default JwtModule.register({
    global: true,
    secret: JWT_SECRET,
    signOptions: { expiresIn: '24h' },
})
