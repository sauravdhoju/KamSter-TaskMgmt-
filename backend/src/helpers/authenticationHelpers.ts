import crypto from 'crypto';

import { secret } from '../envconfig';

export const random = () => crypto.randomBytes(128).toString('base64');

// returns a salt encrypted password
export const authentication = (salt: string, password: string) => {
    return crypto
        .createHmac('sha256', [salt, password].join('/'))
        .update(secret)
        .digest('hex');
};
