import { GithubAuthProvider, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { v4 as uuidv4 } from 'uuid';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    window.location.reload();
  } catch (error) {
    console.error("Error signing in with Google: ", error);
  }
};

export const signInWithGithub = async () => {
  try {
    await signInWithPopup(auth, githubProvider);
    window.location.reload();
  } catch (error) {
    console.error("Error signing in with GitHub: ", error);
  }
};

export const Menus = [
  { id: uuidv4(), name : "Projects", url : "/home/projects"},
  { id: uuidv4(), name : "Collections", url : "/home/collection"},
  { id: uuidv4(), name : "Profile", url : "/home/profile"},
];

export const signOutAction = async() => {
  await auth.signOut().then(() => {
    window.location.reload();
  });
};