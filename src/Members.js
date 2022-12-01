import { useEffect, useState } from "react"
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const Members = () => {
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, 'users');

    useEffect(() => {
        const getUsers = async () =>{
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };

        getUsers();
    },)

    return (
        <main class="h-screen bg-zinc-200">
            <div class="pt-10">
                <h1 class="grid text-4xl place-content-center font-semibold underline underline-offset-8">Members List</h1>
            </div>
            <div class="pt-10 ">
                    <div class="flex flex-col">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-hidden">
                                <table class="min-w-full text-center">
                                <thead class="border-b bg-gray-800">
                                    <tr>
                                    <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                                        
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                                        Name
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                                        Street
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                                        Contact-Number
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                                        Email
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                                        Checked  in
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => {
                                        return <tr class="bg-white border-b">
                                            {" "}
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user.name}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user.address}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user.number}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {user.email}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <li class="text-lime-500 text-xl ml-4">
                                            
                                            </li>
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