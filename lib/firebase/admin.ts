/**
 * Firebase Admin SDK Architecture Blueprint (Server-Side Only)
 *
 * This module is reserved exclusively for Node.js server routes running on Hostinger.
 * It will not be bundled into client-side code.
 */

export interface FirebaseAdminConfig {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

export function getAdminConfig(): FirebaseAdminConfig | null {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  return { projectId, clientEmail, privateKey };
}
