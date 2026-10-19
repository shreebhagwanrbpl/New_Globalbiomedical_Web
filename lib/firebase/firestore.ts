import { getFirestore, type Firestore } from 'firebase/firestore';
import { app } from './config';

/**
 * Singleton Firestore Database instance
 */
export const db: Firestore = getFirestore(app);
