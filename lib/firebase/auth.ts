import { getAuth, type Auth } from 'firebase/auth';
import { app } from './config';

/**
 * Singleton Firebase Authentication instance
 */
export const auth: Auth = getAuth(app);
