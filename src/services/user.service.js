import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../environment/environment";

export async function createUser(email, password, name) {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: name });

    // Store profile details only. Never store the password in Firestore.
    await setDoc(doc(db, "users", credential.user.uid), {
      uid: credential.user.uid,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      createdAt: serverTimestamp(),
    });

    return credential.user;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}

export async function signInUser(email, password) {
  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      email.trim().toLowerCase(),
      password
    );
    return credential.user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

export async function signOutUser() {
  await signOut(auth);
}
