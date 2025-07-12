import * as FileSystem from 'expo-file-system';

const SUPABASE_URL = 'https://ugkeqpakufrgkyrvnkpe.supabase.co';
const SUPABASE_BUCKET = 'profile-pictures';
const SUPABASE_FOLDER = 'profile';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVna2VxcGFrdWZyZ2t5cnZua3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMDgxOTcsImV4cCI6MjA2Nzc4NDE5N30.YGeMLiubGrg-UxOPooy-vF2dslyqrzetLwmD3k0TX1E';

export async function uploadImageToSupabase(
  localUri: string,
  onLoading?: (isLoading: boolean) => void
): Promise<string | null> {
  try {
    onLoading?.(true);

    const fileName = localUri.split('/').pop();
    const fileExt = fileName?.split('.').pop()?.toLowerCase();
    const contentType = fileExt === 'jpg' || fileExt === 'jpeg' ? 'image/jpeg' : 'image/png';

    const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${SUPABASE_BUCKET}/${SUPABASE_FOLDER}/${fileName}`;
    const { uri } = await FileSystem.getInfoAsync(localUri);

    const uploadResult = await FileSystem.uploadAsync(uploadUrl, uri, {
      httpMethod: 'PUT',
      headers: {
        'Content-Type': contentType,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (uploadResult.status !== 200) {
      console.error('Upload failed:', uploadResult.body);
      return null;
    }

    return `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_BUCKET}/${SUPABASE_FOLDER}/${fileName}`;
  } catch (err) {
    console.error('Image upload error:', err);
    return null;
  } finally {
    onLoading?.(false);
  }
}

