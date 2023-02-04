import { useEffect, useState } from "react"
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import SkeletonMember from "./Skeletons/SkeletonMember";

const Members = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const usersCollectionRef = collection(db, 'users');

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            const sortedUsers = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
              });
              setUsers(sortedUsers);
            setIsLoading(false);
        };
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <main className="h-screen bg-zinc-200">
            <div className="pt-24">
                <h1 className="grid text-gray-800 text-4xl place-content-center font-semibold underline underline-offset-8 decoration-1">Members List</h1>
            </div>
            <div className="pt-10">
                <div className="flex flex-col">
                    <div>
                        <div className="pt-4 inline-block min-w-full ">
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
                                                CPF Sector
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
                                    {isLoading ? (
                                        <SkeletonMember />
                                    ) : 
                                        users.map((user, index) => {
                                            return <tr className="bg-white border-b" key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {user.name}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {user.address}
                                                </td>
                                                <td className="flex justify-center items-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {user.CPFSector}
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
                                                    <li className={user.checkedIn ? 'text-xl ml-4 text-lime-400' : 'text-xl ml-4 text-gray-900'} ></li>
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