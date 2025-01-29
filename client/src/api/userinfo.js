import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const userRecordsCollectionRef = collection(db, "UserRecords");

export const createUserProfile = async (
  fname,
  lname,
  uname,
  dob,
  tandc,
  ppolicy
) => {
  try {
    await addDoc(userRecordsCollectionRef, {
      firstName: fname,
      lastName: lname,
      userName: uname,
      dateOfBirth: dob,
      termsAndConditions: tandc,
      privacyPolicy: ppolicy,
    });
  } catch (error) {
    console.log(error);
  }
};
