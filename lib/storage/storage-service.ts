import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/storage';

/**
 * Uploads a product image or asset to Firebase Storage and returns its public download URL
 */
export async function uploadAsset(
  folderPath: string,
  file: File | Blob,
  fileName: string
): Promise<string> {
  const fileRef = ref(storage, `${folderPath}/${Date.now()}_${fileName}`);
  const snapshot = await uploadBytes(fileRef, file);
  return getDownloadURL(snapshot.ref);
}

/**
 * Deletes an asset from Firebase Storage given its full URL or path
 */
export async function deleteAsset(storagePathOrUrl: string): Promise<void> {
  const fileRef = ref(storage, storagePathOrUrl);
  await deleteObject(fileRef);
}
