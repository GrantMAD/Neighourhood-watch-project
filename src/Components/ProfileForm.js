import { useState, useEffect } from "react"
import { db, auth } from "../firebase";
import { collection, query, where, updateDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';

const ProfileForm = () => {
  const [userData, setUserData] = useState(null);
  const [newName, setNewName] = useState();
  const [email, setEmail] = useState();
  const [newAddress, setNewAddress] = useState();
  const [newAbout, setNewAbout] = useState();
  const [newNumber, setNewNumber] = useState(0);
  const [cpfSector, setCpfSector] = useState();
  const [district, setDistrict] = useState();
  const [profileImageUpload, setProfileImageUpload] = useState();
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
  const [profileUpdated, setProfileUpdated] = useState(false);
  const navigate = useNavigate();
  const usersCollectionRef = collection(db, "users");
  const [neighbourhoodOptions, setNeighbourhoodOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);

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
      setCpfSector(userData.cpfSector)
      setNewAddress(userData.address)
      setNewAbout(userData.about)
      setNewNumber(userData.number)
      setProfileImageUpload(userData.image)
      setDistrict(userData.district)
      setEmergencyContactName(userData.emergencyContactName)
      setEmergencyContactNumber(userData.emergencyContactNumber)
    }
  }, [userData]);

  useEffect(() => {
    const fetchNeighbourhoodOptions = async () => {
      try {
        const sectorOptionsDocRef = doc(db, "SectorOptions", "kEbia4X43HuZk6d1FsBp");
        const sectorOptionsDocSnap = await getDoc(sectorOptionsDocRef);

        if (sectorOptionsDocSnap.exists()) {
          const data = sectorOptionsDocSnap.data();
          if (data && data.NeighbourhoodOptions) {
            setNeighbourhoodOptions(data.NeighbourhoodOptions);
          }
        }
      } catch (error) {
        console.error("Error fetching neighbourhood options:", error);
      }
    };
    const fetchDistrictOptions = async () => {
      try {
        const sectorOptionsDocRef = doc(db, "SectorOptions", "rRQ6V0nsbnIuS7ZbIPMk");
        const sectorOptionsDocSnap = await getDoc(sectorOptionsDocRef);

        if (sectorOptionsDocSnap.exists()) {
          const data = sectorOptionsDocSnap.data();
          if (data && data.DistrictOptions) {
            setDistrictOptions(data.DistrictOptions);
          }
        }
      } catch (error) {
        console.error("Error fetching district options:", error);
      }
    };

    fetchDistrictOptions();
    fetchNeighbourhoodOptions();
  }, []);

  const UpdateUser = async (e) => {
    const profileURL = await uploadProfileImage();
    const userQuery = query(usersCollectionRef, where("email", "==", userData.email));
    const data = await getDocs(userQuery)
    const userDocRef = data.docs[0].ref

    let updatedUser = {
      name: newName,
      email: email,
      address: newAddress,
      number: newNumber,
      about: newAbout,
      cpfSector: cpfSector,
      district: district, 
      emergencyContactName: emergencyContactName || "",
      emergencyContactNumber: emergencyContactNumber || ""
    }

    if (profileURL !== undefined) {
      updatedUser = {
        profileImage: profileURL,
        ...updatedUser
      }
    }

    await updateDoc(userDocRef, updatedUser);
    setProfileUpdated(!profileUpdated);
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
                This information will be displayed publicly so be careful what you share. Neighbourhood not yet apart of Sector 2? Is your neighbourhood not yet apart of Sector 2? 
                <a className="font-bold text-blue-600" href="../AddNeighbourhoodRequest"> Request</a> your neighbourhood to be added to become apart of the Sector 2 community.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                {userData && (
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div>
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700 after:content-none">
                        About
                      </label>
                      <div className="mt-1">
                        <textarea
                          defaultValue={userData.about}
                          type="text"
                          id="about"
                          name="about"
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
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
                    <div className="bg-white">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 after:content-none">
                            Name
                          </label>
                          <input
                            defaultValue={userData.name}
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                            onChange={(event) => {
                              setNewName(event.target.value);
                            }}

                          />
                        </div>
                        <div className="col-span-5 sm:col-span-3">
                          <label htmlFor="CPFSector" className="block text-sm font-medium text-gray-700 after:content-none">
                            Neighbourhood
                          </label>
                          <select
                            value={cpfSector}
                            name="CpfSector"
                            id="CpfSector"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                            onChange={(event) => {
                              setCpfSector(event.target.value);
                            }}
                          >
                            <option value="">Select Neighbourhood</option>
                            {neighbourhoodOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="street-address" className="block text-sm font-medium text-gray-700 after:content-none">
                            Street address
                          </label>
                          <input
                            defaultValue={userData.address}
                            type="text"
                            name="street-address"
                            id="street-address"
                            autoComplete="street-address"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                            onChange={(event) => {
                              setNewAddress(event.target.value);
                            }}

                          />
                        </div>
                        <div className="col-span-5 sm:col-span-3">
                          <label htmlFor="district" className="block text-sm font-medium text-gray-700 after:content-none">
                            District
                          </label>
                          <select
                            defaultValue={userData.district}
                            placeholder="Sea View/Hillary"
                            type="text"
                            name="district"
                            id="district"
                            autoComplete="district"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                            onChange={(event) => {
                              setDistrict(event.target.value);
                            }}
                          >
                            <option value="">Select district</option>
                            {districtOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-5 sm:col-span-3">
                          <label htmlFor="CPFSector" className="block text-sm font-medium text-gray-700 after:content-none">
                            Emergency Contact Name
                          </label>
                          <input
                            defaultValue={userData.emergencyContactName}
                            type="text"
                            name="emergencyContactName"
                            id="emergencyContactName"
                            autoComplete="emergencyContactName"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                            onChange={(event) => {
                              setEmergencyContactName(event.target.value);
                            }}
                          />
                        </div>
                        <div className="col-span-5 sm:col-span-3">
                          <label htmlFor="CPFSector" className="block text-sm font-medium text-gray-700 after:content-none">
                            Emergency Contact Number
                          </label>
                          <input
                            defaultValue={userData.emergencyContactNumber}
                            type="number"
                            name="emergencyContactNumber"
                            id="emergencyContactNumber"
                            autoComplete="emergencyContactNumber"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                            onChange={(event) => {
                              setEmergencyContactNumber(event.target.value);
                            }}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-4">
                          <label htmlFor="number" className="block text-sm font-medium text-gray-700 after:content-none">
                            Contact Number
                          </label>
                          <input
                            defaultValue={userData.number}
                            type="number"
                            name="number"
                            id="number"
                            autoComplete="number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                            onChange={(event) => {
                              setNewNumber(event.target.value);
                            }}

                          />
                        </div>
                        <div className="col-span-6 sm:col-span-4">
                          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 after:content-none">
                            Email address
                          </label>
                          <input
                            defaultValue={userData.email}
                            type="text"
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                            disabled={true}
                            onChange={(event) => {
                              setEmail(event.target.value);
                            }}

                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 after:content-none">Profile Image</label>
                      <div className="mt-1 flex items-center">
                        <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100 mt-5">
                          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <div className="mb-3 ml-5 w-96 text-center">
                          <label for="formFileMultiple" class="form-label inline-block mb-2 text-gray-700 underline underline-offset-2 after:content-none">Input Image here</label>
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
                  <Toaster richColors />
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={(e) => {
                      e.preventDefault();
                      UpdateUser();
                      toast.success('Profile Updating, Please wait.');
                    }}
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
