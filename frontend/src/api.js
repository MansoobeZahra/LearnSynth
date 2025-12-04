/**
 * API Helper for LearnSynth AI
 * Centralizes all backend communication
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

/**
 * Send a chat message with optional file attachment
 * @param {string} message - The user's message
 * @param {File|null} file - Optional file to attach
 * @returns {Promise<{response: string, model: string}>}
 */
export async function sendChatMessage(message, file = null) {
    const formData = new FormData();
    formData.append('message', message);

    if (file) {
        formData.append('file', file);
    }

    const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

/**
 * Upload a file to the backend
 * @param {File} file - The file to upload
 * @returns {Promise<{message: string, filename: string}>}
 */
export async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Upload failed! status: ${response.status}`);
    }

    return await response.json();
}

/**
 * Check backend health
 * @returns {Promise<{status: string}>}
 */
export async function checkHealth() {
    const response = await fetch(`${API_BASE_URL}/health`);

    if (!response.ok) {
        throw new Error(`Health check failed! status: ${response.status}`);
    }

    return await response.json();
}

/**
 * Get available models from backend
 * @returns {Promise<{models: string[]}>}
 */
export async function getAvailableModels() {
    const response = await fetch(`${API_BASE_URL}/api/models`);

    if (!response.ok) {
        throw new Error(`Failed to fetch models! status: ${response.status}`);
    }

    return await response.json();
}

export default {
    sendChatMessage,
    uploadFile,
    checkHealth,
    getAvailableModels,
};
