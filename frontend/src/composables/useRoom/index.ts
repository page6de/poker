import { ref } from 'vue';
import axios from "axios";

interface UseRoomInterface {
  generateRoomId: () => Promise<string>
  setRoom: (roomId:string) => void
  getRoom: () => string,
  getRoomUrl: () => string,
}

console.log('ENV_:', import.meta.env)
const API_URL = import.meta.env.VITE_APP_SERVER_URL;
const currentRoomId = ref('');

export function useRoom(): UseRoomInterface {

  const generateRoomId = async () => {
    let roomId = '';
    try {
      const res = await axios.get(`${API_URL}/createRoom`);
      roomId = res.data?.roomId || 'no luck';
    } catch (e) {
      console.error('Room Request Failed', e)
    }
    return roomId;
  }

  const setRoom = (roomId:string) => {
    currentRoomId.value = roomId;
  }

  const getRoom = (): string => {
    return currentRoomId.value;
  }

  const getRoomUrl = (): string => {
    return `${import.meta.env.VITE_APP_FRONTEND_URL}/room/${currentRoomId.value}`;
  }

  return {
    generateRoomId,
    getRoom,
    setRoom,
    getRoomUrl,
  }
}
