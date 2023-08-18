import { Ref, ref } from 'vue';


interface useUserInterface {
  setUser: (username: string) => void,
  getCurrentUser: () => string
}


const currentUser: Ref<string> = ref('');

export function useUser(): useUserInterface {
  const setUser = (username: string) => {
    localStorage.setItem('username', username);
    currentUser.value = username;
  } 

  const getCurrentUser = ():string => {
    if (!currentUser.value) {
      const savedUser = getSavedUser();
      if (savedUser) currentUser.value = savedUser;
    }
    return currentUser.value
  }

  const getSavedUser = (): string => {
    return localStorage.getItem('username') as string;
  }

  return {
    getCurrentUser,
    setUser
  }
}