import { useState, useEffect } from "react"
import { db, auth } from "./firebase";
import { collection, doc } from "firebase/firestore";
import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const [newName, setNewName] = useState();
  const [email, setEmail] = useState();
  const [newAddress, setNewAddress] = useState();
  const [newAbout, setNewAbout] = useState();
  const [newNumber, setNewNumber] = useState(0);
  const [profileImageUpload, setProfileImageUpload] = useState();
  const navigate = useNavigate();
  const usersCollecctionRef = collection(db, "users");

  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(usersCollecctionRef, auth.currentUser.uid);
      const userDoc = await userDocRef.getDocs();
      if (userDoc.exists) {
        setNewName(userDoc.data().name);
        setEmail(userDoc.data().email);
        setNewAddress(userDoc.data().address);
        setNewAbout(userDoc.data().about);
        setNewNumber(userDoc.data().number);
      }
    };
    fetchUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const UpdateUser = async (e) => {
    e.preventDefault();
    const profileURL = await uploadProfileImage();
    const userDocRef = collection(db, "users").doc(auth.currentUser.uid);
  
    await userDocRef.update({ name: newName, email: email, address: newAddress, number: newNumber, about: newAbout, profileImage: profileURL });
    navigate('/Profile');
  };

  const uploadProfileImage = async (e) => {
    if (profileImageUpload == null) return;
    const ProfileRef = ref(storage, `profileImages/${profileImageUpload.name + v4()}`);
    return uploadBytes(ProfileRef, profileImageUpload).then((uploadResult) => {
      return getDownloadURL(uploadResult.ref).then((downloadURL) => {
        return downloadURL
      })
    })
  };


  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      About
                    </label>
                    <div className="mt-1">
                      <textarea
                        key="{about}"
                        type="text"
                        id="about"
                        name="about"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="About yourself"
                        defaultValue={''}
                        onChange={(event) => {
                          setNewAbout(event.target.value);
                        }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile.
                    </p>
                  </div>
                  <div className="bg-white ">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(event) => {
                            setNewName(event.target.value);
                          }}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                          Contact Number
                        </label>
                        <input
                          type="number"
                          name="number"
                          id="number"
                          autoComplete="number"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(event) => {
                            setNewNumber(event.target.value);
                          }}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                        />
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                          Street address
                        </label>
                        <input
                          type="text"
                          name="street-address"
                          id="street-address"
                          autoComplete="street-address"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(event) => {
                            setNewAddress(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100 mt-5">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <div className="mb-3 ml-5 w-96 text-center">
                        <label for="formFileMultiple" class="form-label inline-block mb-2 text-gray-700">Input files here</label>
                        <input
                          className="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-500
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          type="file"
                          id="formFileMultiple"
                          multiple
                          onChange={(event) => {
                            setProfileImageUpload(event.target.value);
                          }}
                        />
                      </div>
                      {/*
                        <button
                          type="file"
                          className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Change
                        </button>
                      */}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={UpdateUser}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default ProfileForm