import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SkeletonMember from "../Skeletons/SkeletonMember";

const MembersPanel = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const usersCollectionRef = collection(db, "users");
    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            const sortedUsers = data.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }))
                .sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                });
            setUsers(sortedUsers);
            setIsLoading(false);
        };
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const userPublicProfile = (user) => {
        navigate(`/PublicProfile/${user.id}`, {
            state: { selectedUser: user },
        });
    };

    const filterUsers = (user) => {
        if (searchTerm === "") {
            return true;
        } else {
            const nameMatch = user.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const CPFSectorMatch = user.CPFSector
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());
            return nameMatch || CPFSectorMatch;
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const updateUserRole = async (userId, newRole) => {
        try {
            await updateDoc(doc(db, "users", userId), { role: newRole });
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, role: newRole } : user
                )
            );
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    return (
        <main className="min-h-screen bg-zinc-200">
            <div className="pt-24">
                <h1 className="grid text-gray-800 text-4xl place-content-center font-semibold underline underline-offset-8 decoration-2 decoration-blue-700 mb-10">
                    Members List
                </h1>
            </div>
            <div>
                <div className="ml-5 mr-5">
                    <div className="bg-gray-100 rounded border border-gray-800 flex items-center drop-shadow-md w-full sm:w-3/12 md:w-4/12 lg:w-2/12">
                        <button className="py-2 px-4 bg-gray-800 text-zinc-200 rounded-l border-r border-gray-200 hover:bg-gray-700 active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none">
                            Search
                        </button>
                        <input
                            type="search"
                            placeholder="Name/CPF Sector"
                            className="bg-transparent py-1 text-gray-600 px-4 focus:outline-gray-800 w-full border-none"
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="mt-3 pb-3">
                        <p>
                            This page is only accessible to admins. Here you will get
                            information on all members that aren't already on the main members
                            page.
                        </p>
                    </div>
                </div>
                <div className="pt-4 overflow-hidden">
                    <table className="text-center">
                        <thead className="pl-[1%] border-b bg-gray-800">
                            <tr>
                                <th
                                    scope="col"
                                    className="hidden text-sm font-medium text-white px-6 py-4 lg:table-cell"
                                ></th>
                                <th
                                    scope="col"
                                    className="w-1/6 text-sm font-medium text-white px-6 py-4"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="hidden lg:w-1/6 md:w-1/4 sm:w-1/3 px-6 py-4 text-sm font-medium text-white lg:table-cell"
                                >
                                    User's role
                                </th>
                                <th
                                    scope="col"
                                    className="hidden lg:w-1/6 md:w-1/4 sm:w-1/3 px-6 py-4 text-sm font-medium text-white md:table-cell"
                                >
                                    Street
                                </th>
                                <th
                                    scope="col"
                                    className="hidden lg:w-1/6 md:w-1/4 sm:w-1/3 px-6 py-4 text-sm font-medium text-white lg:table-cell"
                                >
                                    CPF Sector
                                </th>
                                <th
                                    scope="col"
                                    className="lg:pl-[2%] w-1/6 text-sm font-medium text-white px-6 py-4"
                                >
                                    Checked in
                                </th>
                                <th
                                    scope="col"
                                    className="lg:pl-5 pl-[3%] w-1/6 text-sm font-medium text-white px-6 py-4"
                                >
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <SkeletonMember />
                            ) : (
                                // eslint-disable-next-line array-callback-return
                                users
                                    .filter(filterUsers)
                                    .map((user, index) => {
                                        return (
                                            <tr
                                                className=" w-screen pt-[.3%] bg-white border-b"
                                                key={user.id}
                                            >
                                                <td className="hidden pl-8 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 lg:table-cell">
                                                    {index + 1}
                                                </td>
                                                <td
                                                    className="w-1/6 text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap cursor-pointer hover:scale-125"
                                                    key={user.id}
                                                    onClick={() => userPublicProfile(user)}
                                                >
                                                    {user.name}
                                                </td>
                                                <td className="text-md hidden lg:w-1/6 md:w-1/4 sm:w-1/3 whitespace-nowrap px-6 py-4 font-light text-gray-900 lg:table-cell">
                                                    {user.role === "admin" ? (
                                                        <span>Admin</span>
                                                    ) : (
                                                        <select
                                                            className="rounded-md text-center"
                                                            value={user.role}
                                                            onChange={(e) =>
                                                                updateUserRole(user.id, e.target.value)
                                                            }
                                                        >
                                                            <option value="user">User</option>
                                                            <option value="pendingUser">Pending User</option>
                                                        </select>
                                                    )}
                                                </td>
                                                <td className="text-md hidden lg:w-1/6 md:w-1/4 sm:w-1/3 whitespace-nowrap px-6 py-4 font-light text-gray-900 md:table-cell">
                                                    {user.address}
                                                </td>
                                                <td
                                                    type="number"
                                                    className="w-1/6 text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap border-none"
                                                >
                                                    {user.number}
                                                </td>
                                                <td className="w-1/6 text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <li
                                                        className={
                                                            user.checkedIn
                                                                ? "text-xl ml-4 text-lime-400"
                                                                : "text-xl ml-4 text-gray-900"
                                                        }
                                                    ></li>
                                                </td>
                                                <td className="lg:text-md hidden items-center justify-center whitespace-nowrap px-6 py-4 font-light text-gray-900 sm:w-1/3 md:w-1/4 md:text-sm lg:table-cell lg:w-1/6">
                                                    <button className="bg-red-500 hover:drop-shadow-2xl text-white font-bold py-2 px-4 rounded shadow-xl hover:scale-125 border border-red-700">
                                                        Delete user
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default MembersPanel;
