import { atom } from 'nanostores'

interface User {
    email: String,
    roles: Array<String>
};

const userStore = atom<User | null>(null);
export default userStore;
export type { User };