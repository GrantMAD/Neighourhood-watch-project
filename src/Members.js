import { useEffect, useState } from "react"
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SkeletonMember from "./Skeletons/SkeletonMember";

const Members = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const usersCollectionRef = collection(db, 'users');
    const navigate = useNavigate();

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

    const userPublicProfile = (user) => {
        // console.log(`Member to be viewed:`, user)
        navigate(`/PublicProfile/${user.id}`, {
            state: { selectedUser: user }
        })
    }

    return (
        <main className="min-h-screen bg-zinc-200">
            <div className="pt-24">
                <h1 className="grid text-gray-800 text-4xl place-content-center font-semibold underline underline-offset-8 decoration-1 mb-10">Members List</h1>
            </div>
            <div>
                <div className="ml-5 mr-5">
                    <div
                        class="bg-gray-100 rounded border border-gray-800 flex items-center drop-shadow-md w-full sm:w-3/12 md:w-4/12 lg:w-2/12">
                        <button
                            class="py-2 px-4 bg-gray-800 text-zinc-200 rounded-l border-r border-gray-200 hover:bg-gray-700 active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none">
                            Search
                        </button>
                        <input
                            type="search"
                            placeholder="Member's Name"
                            class="bg-transparent py-1 text-gray-600 px-4 focus:outline-gray-800 w-full border-none"
                            onChange={e => { setSearchTerm(e.target.value) }}
                        />
                    </div>
                    <div className="mt-3 pb-3">
                        <p>All Member's are displayed here. Registered patroller's have access to all Member's information that are currently displayed. To search for a member input the member's name above. To view a member's profile click on their name.</p>
                    </div>
                </div>
                <div className="pt-4 overflow-hidden">
                    <table className="text-center">
                        <thead className="pl-[1%] border-b bg-gray-800">
                            <tr>
                                <th scope="col" className="hidden text-sm font-medium text-white px-6 py-4 lg:table-cell">

                                </th>
                                <th scope="col" className="w-1/6 text-sm font-medium text-white px-6 py-4">
                                    Name
                                </th>
                                <th scope="col" className="hidden lg:w-1/6 md:w-1/4 sm:w-1/3 px-6 py-4 text-sm font-medium text-white md:table-cell">
                                    Street
                                </th>
                                <th scope="col" className="hidden lg:w-1/6 md:w-1/4 sm:w-1/3 px-6 py-4 pl-[2%] text-sm font-medium text-white lg:table-cell">
                                    CPF Sector
                                </th>
                                <th scope="col" className="pl-[2%] w-1/6 text-sm font-medium text-white px-6 py-4">
                                    Contact-Number
                                </th>
                                <th scope="col" className="hidden lg:w-1/6 md:w-1/4 sm:w-1/3 px-6 py-4 text-sm font-medium text-white lg:table-cell">
                                    Email
                                </th>
                                <th scope="col" className="lg:pl-5 pl-[3%] w-1/6 text-sm font-medium text-white px-6 py-4">
                                    Checked  in
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <SkeletonMember />
                            ) :
                                // eslint-disable-next-line array-callback-return
                                users.filter((value) => {
                                    if (searchTerm === "") {
                                        return value
                                    } else if (value.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return value
                                    }
                                }).map((user, index) => {
                                    return <tr className=" w-screen pt-[.3%] bg-white border-b" key={user.id}>
                                        <td className="hidden pl-8 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 lg:table-cell">{index + 1}</td>
                                        <td className="w-1/6 text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap cursor-pointer hover:scale-125 ..." key={user.id}
                                            onClick={() => userPublicProfile(user) }
                                        >
                                            {user.name}
                                        </td>
                                        <td className="text-md  hidden lg:w-1/6 md:w-1/4 sm:w-1/3 whitespace-nowrap px-6 py-4 font-light text-gray-900 md:table-cell">
                                            {user.address}
                                        </td>
                                        <td className="lg:text-md hidden items-center justify-center whitespace-nowrap px-6 py-4 font-light text-gray-900 sm:w-1/3 md:w-1/4 md:text-sm lg:table-cell lg:w-1/6">
                                            {user.CPFSector}
                                        </td>
                                        <td
                                            type="number"
                                            className="w-1/6 text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap border-none">
                                            0{user.number}
                                        </td>
                                        <td className="text-md hidden lg:w-1/6 md:w-1/4 sm:w-1/3 whitespace-nowrap px-6 py-4 font-light text-gray-900 lg:table-cell">
                                            {user.email}
                                        </td>
                                        <td className="w-1/6 text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <li className={user.checkedIn ? 'text-xl ml-4 text-lime-400' : 'text-xl ml-4 text-gray-900'} ></li>
                                        </td>
                                    </tr>
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}
export default Members
