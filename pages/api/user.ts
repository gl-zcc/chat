import { withIronSession } from "next-iron-session";

function handler(req: any, res: any) {
    const user = req.session.get("user");
    res.send({ user });
}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: "chat_token",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});