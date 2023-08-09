import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState()
  const [showTooltip, setShowTooltip] = useState(false);

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

  const deleteAccount = async (userId) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      await deleteUser(auth.currentUser);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-10  mx-auto bg-zinc-200">
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
                  className="w-48 h-48 bg-indigo-100 mx-auto rounded-full drop-shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center"
                >
                  <img
                    src={user.profileImage}
                    alt=""
                    className="w-48 h-48 rounded-full"
                  />
                </div>
              </div>

              <div className="space-x-8 lg:space-x-8 md:space-x-2 flex justify-center mt-32 mr-14 md:mt-0 md:justify-center lg:justify-end lg:mr-5">
                <button
                  className="text-white py-2 px-4 uppercase rounded bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 shadow hover:shadow-lg font-medium ml-[60px] lg:ml-0"
                  onClick={editProfile}
                >
                  Edit Profile
                </button>
                <div
                  className="relative inline-block" 
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <button
                    className="bg-gradient-to-l from-red-500 to-red-600 hover:bg-gradient-to-r hover:scale-105 hover:drop-shadow-2xl text-white font-bold py-2 px-4 rounded-md shadow-xl"
                    onClick={async () => {
                      deleteAccount(user.id);
                    }}
                  >
                    Delete Account
                  </button>
                  {showTooltip && (
                    <div className="absolute bg-zinc-200 rounded-md px-2 py-1 text-gray-800 border border-gray-800 mt-2 whitespace-nowrap mr-32 -right-32 font-semibold">
                      By clicking Delete Account you will be deleting your account from our database.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:mt-20 text-center border-b pb-10 md:mt-16">
              <h1 className="text-4xl font-medium text-gray-800 underline underline-offset-3">{user.name}</h1>
              <div>
                <h1 className="text-blue-600 font-bold mt-5 underline">Address:</h1>
                <p className="text-gray-800">{user.address} {user.district}</p>
              </div>
              <div>
                <h1 className="text-blue-600 font-bold mt-2 underline">Neighbourhood:</h1>
                <p className="text-gray-800">{user.cpfSector}</p>
              </div>
              <div>
                <h1 className="text-blue-600 font-bold mt-2 underline">Cell Number:</h1>
                <p className="text-gray-800">{user.number}</p>
              </div>
              <div>
                <h1 className="text-blue-600 font-bold mt-2 underline">Email:</h1>
                <p className="text-gray-800">{user.email}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-col justify-center">
              <h1 className="text-2xl text-blue-600 font-bold mt-2 underline text-center mb-5">About Me</h1>
              <p className="text-gray-800 text-center lg:px-16">{user.about}</p>
            </div>

          </div>
        })}
      </div>

    </main>
  )
}

export default Profile;