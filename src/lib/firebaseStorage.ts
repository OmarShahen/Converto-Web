import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export interface UploadProgress {
  progress: number;
  isUploading: boolean;
  error: string | null;
}

export const uploadImageToFirebase = (
  file: File,
  path: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Create a unique filename
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const fullPath = `${path}/${fileName}`;
    
    // Create a reference to the file location
    const storageRef = ref(storage, fullPath);
    
    // Start the upload
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Track upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.({
          progress,
          isUploading: true,
          error: null,
        });
      },
      (error) => {
        // Handle errors
        console.error('Upload failed:', error);
        onProgress?.({
          progress: 0,
          isUploading: false,
          error: error.message,
        });
        reject(error);
      },
      async () => {
        // Upload completed successfully
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onProgress?.({
            progress: 100,
            isUploading: false,
            error: null,
          });
          resolve(downloadURL);
        } catch (error) {
          console.error('Failed to get download URL:', error);
          onProgress?.({
            progress: 0,
            isUploading: false,
            error: 'Failed to get download URL',
          });
          reject(error);
        }
      }
    );
  });
};

export const deleteImageFromFirebase = async (imageUrl: string): Promise<void> => {
  try {
    // Extract the file path from the download URL
    const url = new URL(imageUrl);
    
    // Handle both formats: /v0/b/bucket/o/path and /o/path
    let pathMatch = url.pathname.match(/\/o\/(.+?)(?:\?|$)/);
    
    // If the first pattern doesn't match, try the v0 format
    if (!pathMatch) {
      pathMatch = url.pathname.match(/\/v0\/b\/[^\/]+\/o\/(.+?)(?:\?|$)/);
    }
    
    if (!pathMatch) {
      console.error('Failed to parse Firebase Storage URL:', imageUrl);
      throw new Error('Invalid Firebase Storage URL format');
    }
    
    const filePath = decodeURIComponent(pathMatch[1]);
    console.log('Attempting to delete file at path:', filePath);
    
    const imageRef = ref(storage, filePath);
    await deleteObject(imageRef);
    console.log('Image deleted successfully');
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

export const uploadMultipleImages = async (
  files: File[],
  path: string,
  onProgress?: (fileIndex: number, progress: UploadProgress) => void
): Promise<string[]> => {
  const uploadPromises = files.map((file, index) => 
    uploadImageToFirebase(file, path, (progress) => {
      onProgress?.(index, progress);
    })
  );
  
  try {
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Failed to upload multiple images:', error);
    throw error;
  }
};