import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })
  }, [])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersCollectionRef = collection(db, 'users')
        const userQuery = query(usersCollectionRef, where("email", "==", user.email))
        const data = await getDocs(userQuery)
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (e) {
        console.log(e)
      }
    };

    getUsers();
  }, [user])

  const editProfile = () => {
    navigate('/ProfilePage');
  }

  return (
    <main className="h-screen p-4 md:p-8 lg:p-10  mx-auto bg-zinc-200">
      <div className="p-4 md:p-8 lg:p-16">
        {users.map((user) => {
          return <div
            className="p-8 bg-white shadow mt-24"
            key={user.id}
          >
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">

              </div>
              <div className="relative">
                <div
                  className="w-48 h-48 bg-indigo-100 mx-auto rounded-full drop-shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500"
                >
                  <img
                    src={user.profileImage}
                    alt=""
                    className="w-48 h-48 rounded-full"
                  />
                </div>
              </div>

              <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center lg:justify-end lg:mr-5">
                <button
                  className="text-white py-2 px-4 uppercase rounded bg-blue-700 shadow hover:shadow-lg font-medium hover:scale-125 ml-[60px] lg:ml-0"
                  onClick={editProfile}
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="lg:mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-800">{user.name}</h1>
              <div>
                <h1 className="text-blue-700 font-semibold mt-5 underline">Address:</h1>
                <p className="text-gray-800">{user.address}</p>
              </div>
              <div>
                <h1 className="text-blue-700 font-semibold mt-3 underline">Sector:</h1>
                <p className="text-gray-800">{user.CPFSector}</p>
              </div>
              <div>
              <h1 className="text-blue-700 font-semibold mt-3 underline">Cell Number:</h1>
              <p className="text-gray-800">{user.number}</p>
              </div>
              <div>
              <h1 className="text-blue-700 font-semibold mt-3 underline">Email:</h1>
              <p className="text-gray-800">{user.email}</p>
              </div>          
            </div>
            <div className="mt-12 flex flex-col justify-center">
              <p className="text-gray-800 text-center lg:px-16">{user.about}</p>
            </div>

          </div>
        })}
      </div>

    </main>
  )
}

export default Profile;