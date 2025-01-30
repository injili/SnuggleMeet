import { auth } from "./firebase";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  updateProfile,
  sendEmailVerification,
  //   sendPasswordResetEmail,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (
  email,
  password,
  userName
) => {
  try {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(newUser.user, {
      displayName: userName,
    });
    return newUser.user.uid;
  } catch (error) {
    console.log(error);
  }
};

export const dosignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  return result;
};

export const doSignOut = () => {
  return auth.signOut();
};

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
