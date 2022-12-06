import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const Profile = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'users');

    useEffect(() => {
        const getUsers = async () =>{
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
        };

        getUsers();
    },)

  const editProfile = () => {
    navigate('/ProfilePage');
  }

    return (
      <main className="p-10 bg-zinc-200">
        
        <div className="p-16">
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
                className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500"
                onClick={user.profileImage}
                >
                </div>
              </div>

              <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button
                className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                onClick={editProfile}
                >
                Edit Profile
              </button>
              </div>
            </div>

            <div className="mt-20 text-center border-b pb-12">
              <h1 className="text-4xl font-medium text-gray-700">{user.name}, <span className="font-light text-gray-500">27</span></h1>
              <p className="font-light text-gray-600 mt-3">{user.address}</p>

              <p className="mt-8 text-gray-500">{user.number}</p>
              <p className="mt-2 text-gray-500">{user.email}</p>
            </div>

            <div className="mt-12 flex flex-col justify-center">
              <p className="text-gray-600 text-center font-light lg:px-16">{user.about}</p>
            </div>

          </div>
          })}
        </div>
             
      </main>
    )
}

export default Profile;