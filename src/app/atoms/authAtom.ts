import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { SyncStorage } from "jotai/vanilla/utils/atomWithStorage";

export type User = {
  email: string;
  password: string;
  birthDate: string;
  cpf: string;
  phone: string;
  isAuthenticated: boolean;
};

const defaultUser: User = {
  email: "",
  password: "",
  birthDate: "",
  cpf: "",
  phone: "",
  isAuthenticated: false,
};

const localStorageStorage = createJSONStorage(() => localStorage);


export const userAtom = atomWithStorage<User>(
    "user",
    defaultUser,
    localStorageStorage as SyncStorage<User>
  );
export const updateUserAtom = atom(null, (get, set, newUser: Partial<User>) => {
  const currentUser = get(userAtom);
  set(userAtom, { ...currentUser, ...newUser });
});

export const resetUserAtom = atom(null, (_get, set) => {
  set(userAtom, defaultUser);
});