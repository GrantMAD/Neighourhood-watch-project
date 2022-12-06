import { useEffect, useState } from "react"
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const Members = () => {
    const [users, setUsers] = useState([]);
    
    const usersCollectionRef = collection(db, 'users');

    useEffect(() => {
        const getUsers = async () =>{
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
        };

        getUsers();
    },)

    return (
        <main className="h-screen bg-zinc-200">
            <div className="pt-10">
                <h1 className="grid text-4xl place-content-center font-semibold underline underline-offset-8 decoration-1">Members List</h1>
            </div>
            <div className="pt-10 ">
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-center">
                                <thead className="border-b bg-gray-800">
                                    <tr>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Name
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Street
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Contact-Number
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Email
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Checked  in
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => {
                                        return <tr className="bg-white border-b">
                                            {" "}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user.name}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user.address}
                                        </td>
                                        <td 
                                            type="number"
                                            className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-none">
                                            {user.number}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user.email}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <li className="text-lime-500 text-xl ml-4"></li>                                 
                                        </td>
                                        </tr>
                                    })}
                                            
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        </main>
        
    )
}

export default Members