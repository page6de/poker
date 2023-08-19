import { Ref, ref } from 'vue';
import axios from "axios";

interface UseRoomInterface {
  generateRoomId: () => Promise<string>
  setRoom: (roomId:string) => void
  getRoom: () => string
}

const API_URL = process.env.VUE_APP_SERVER_URL;
const currentRoomId: Ref<string> = ref('');

export function useRoom(): UseRoomInterface {

  const generateRoomId = async () => {
    let roomId = '';
    try {
      const res = await axios.get(`${API_URL}/createRoom`);
      roomId = res.data?.roomId || 'no luck';
    } catch (e) {
      console.error('Room Request Failed')
    }
    return roomId;
  }

  const setRoom = (roomId:string) => {
    currentRoomId.value = roomId;
  }

  const getRoom = (): string => {
    return currentRoomId.value;
  }

  return {
    generateRoomId,
    getRoom,
    setRoom
  }
}