import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // limit each IP to 30 requests per window
    message: {
        message: "Too many requests, please try again later."
    },
    standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // disable the `X-RateLimit-*` headers
});