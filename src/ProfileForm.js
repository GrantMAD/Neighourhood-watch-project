import { useState, useEffect } from "react"
import { db, auth } from "./firebase";
import { collection, query, where, updateDoc, getDocs } from "firebase/firestore";
import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const [userData, setUserData] = useState(null);
  const [newName, setNewName] = useState();
  const [email, setEmail] = useState();
  const [newAddress, setNewAddress] = useState();
  const [newAbout, setNewAbout] = useState();
  const [newNumber, setNewNumber] = useState(0);
  const [profileImageUpload, setProfileImageUpload] = useState();
  const navigate = useNavigate();
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const fetchUserData = async () => {
      const usersCollectionRef = collection(db, "users");
      const userQuery = query(usersCollectionRef, where("email", "==", auth.currentUser.email));
      const querySnapshot = await getDocs(userQuery);
      if (querySnapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      querySnapshot.forEach((doc) => {
        setUserData(doc.data());
      });
    };
      fetchUserData();
  }, []);

  useEffect(() => {
    if (userData !== undefined && userData !== null) {
      setNewName(userData.name)
      setEmail(userData.email)
      setNewAddress(userData.address)
      setNewAbout(userData.about)
      setNewNumber(userData.number)
      setProfileImageUpload(userData.image)
    }
  }, [userData])

  const UpdateUser = async (e) => {
    e.preventDefault();
    const profileURL = await uploadProfileImage();

    const userQuery = query(usersCollectionRef, where("email", "==", userData.email));
    const data = await getDocs(userQuery)
    const userDocRef = data.docs[0].ref

    let updatedUser = {
      name: newName,
      email: email,
      address: newAddress,
      number: newNumber,
      about: newAbout
    }

    if (profileURL !== undefined) {
      updatedUser = {
        profileImage : profileURL,
        ...updatedUser
      }
    }

    await updateDoc(userDocRef, updatedUser);
    navigate('/Profile');
  };

  const uploadProfileImage = async () => {
    if (profileImageUpload == null) return;
    const ProfileRef = ref(storage, `profileImages/${profileImageUpload.name + v4()}`);
    return uploadBytes(ProfileRef, profileImageUpload).then(async (uploadResult) => {
      const downloadURL = await getDownloadURL(uploadResult.ref);
      return downloadURL;
    })
  };

  return (
    <main>
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
              {userData && (
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      About
                    </label>
                    <div className="mt-1">
                      <textarea
                        defaultValue={userData.about}
                        key="{about}"
                        type="text"
                        id="about"
                        name="about"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="About yourself"
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
                          defaultValue={userData.name}
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
                          defaultValue={userData.number}
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
                          defaultValue={userData.email}
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
                          defaultValue={userData.address}
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
                            const file = event.target.files[0];
                            setProfileImageUpload(file);
                          }}

                        />
                      </div>
                    </div>
                  </div>
                </div>
                )}
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:scale-125 ..."
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

    </main>
  )
}

export default ProfileForm
