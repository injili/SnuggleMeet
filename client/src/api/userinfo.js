import { db } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const userRecordsCollectionRef = collection(db, "UserRecords");

export const createUserProfile = async (
  fname,
  lname,
  uname,
  dob,
  tandc,
  ppolicy,
  uid
) => {
  try {
    await addDoc(userRecordsCollectionRef, {
      firstName: fname,
      lastName: lname,
      dateOfBirth: dob,
      termsAndConditions: tandc,
      privacyPolicy: ppolicy,
      userName: uname,
      userID: uid,
    });
  } catch (error) {
    console.log(error);
  }
};

export const checkUserName = async (userName) => {
  const q = query(userRecordsCollectionRef, where("userName", "==", userName));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};
