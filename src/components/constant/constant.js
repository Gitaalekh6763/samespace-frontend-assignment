export const SONGS_API = "https://cms.samespace.com/items/songs";

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}


// Function to add duration to each item in data
export async function addDuration(data) {
    const promises = data.map(async (item) => {
        try {
            const audio = new Audio(item.url);
            const duration = await new Promise((resolve) => {
                audio.addEventListener('loadedmetadata', () => {
                    resolve(audio.duration);
                });
                audio.addEventListener('error', (error) => {
                    console.error('Error loading audio:', error);
                    resolve(0); // Fallback duration in case of error
                });
            });

            item.duration = formatDuration(duration);
        } catch (error) {
            console.error('Error processing audio:', error);
            item.duration = '0:00'; // Handle errors while fetching duration
        }
        return item;
    });

    // Wait for all promises to resolve
    return await Promise.all(promises);
}
