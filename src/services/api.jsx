
//aquí vamos a hacer todas las llamadas a API

const API_URL = 'http://localhost:8080'; 

// obtener todas las emociones
export const getEmotions = async () => {
  try {
    const response = await fetch(`${API_URL}/emociones`);
    if (!response.ok) throw new Error('Error obteniendo emociones');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Crear una nueva emoción
export const createEmotion = async (emotionData) => {
  try {
    const response = await fetch(`${API_URL}/emociones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emotionData),
    });
    if (!response.ok) throw new Error('Error creando emoción');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Editar una emoción
export const updateEmotion = async (id, emotionData) => {
  try {
    const response = await fetch(`${API_URL}/emociones/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emotionData),
    });
    if (!response.ok) throw new Error('Error actualizando emoción');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Eliminar una emoción
export const deleteEmotion = async (id) => {
  try {
    const response = await fetch(`${API_URL}/emociones/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error eliminando emoción');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
