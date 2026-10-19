import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { app } from './config';

/**
 * Singleton Firebase Storage instance
 */
export const storage: FirebaseStorage = getStorage(app);
