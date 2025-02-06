import { auth } from "./firebase";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  updateProfile,
  sendEmailVerification,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
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
    return error;
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

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/verified`,
  });
};

export const deleteAccount = async (pass) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await reauthenticate(pass);
      await deleteUser(user);
    } catch (error) {
      return error;
    }
  }
};

const reauthenticate = async (pass) => {
  try {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      pass
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
  } catch (error) {
    return error;
  }
};
export const checkAuthProvider = () => {
  const user = auth.currentUser;
  if (user) {
    const providerId = user.providerData[0]?.providerId;
    if (providerId === "google.com") {
      return false;
    } else {
      return true;
    }
  }
};

export const checkText = (dText, userName) => {
  const DeletionText = `I want to delete my account under username ${userName}`;
  if (dText === DeletionText) {
    return true;
  } else {
    return false;
  }
};

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };
