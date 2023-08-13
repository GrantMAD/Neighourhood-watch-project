import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SkeletonMember from "../Skeletons/SkeletonMember";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Members = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const usersCollectionRef = collection(db, 'users');
    const [groupVisibility, setGroupVisibility] = useState({});
    const navigate = useNavigate();

    useEffect(() => {      
        getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const toggleGroupVisibility = (cpfSector) => {
        setGroupVisibility(prevState => ({
            ...prevState,
            [cpfSector]: !prevState[cpfSector],
        }));
    };

    const userPublicProfile = (user) => {
        navigate(`/PublicProfile/${user.id}`, {
            state: { selectedUser: user }
        });
    };

    const filterUsers = (user) => {
        if (searchTerm === "") {
            return true;
        } else {
            const nameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
            return nameMatch;
        }
    };

    const groupedUsers = users.reduce((groups, user) => {
        const cpfSector = user.cpfSector || 'Unassigned';
        if (!groups[cpfSector]) {
            groups[cpfSector] = [];
        }
        groups[cpfSector].push(user);
        return groups;
    }, {});

    return (
        <main className="min-h-screen bg-zinc-200">
            <div className="pt-24">
                <h1 className="grid text-gray-800 text-4xl place-content-center font-semibold underline underline-offset-8 decoration-2 decoration-blue-700 mb-10">Members List</h1>
            </div>
            <div>
                <div className="ml-5 mr-5">
                    <div class="bg-gray-100 rounded border border-gray-800 flex items-center drop-shadow-md w-full sm:w-3/12 md:w-4/12 lg:w-2/12">
                        <button
                            class="py-2 px-4 bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r text-zinc-200 rounded-l active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none"
                        >
                            Search
                        </button>
                        <input
                            type="search"
                            placeholder="Name/CPF Sector"
                            class="bg-transparent py-1 text-gray-600 px-4 focus:outline-gray-800 w-full border-none"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="mt-3 pb-3">
                        <p>All Signed up Member's are displayed below. Registered patroller's will have access to all Member's information that is currently displayed. To search for a member open the neighbourhood tab that they are from and enter their name into the search bar. To view a member's profile click on the Neighbourhood Watch group Icon, then click on their name to view their details.</p>
                    </div>
                </div>
                <div className="pt-4 overflow-hidden">
                    <table className="text-center">
                        <thead className="pl-[1%] border-b bg-gray-800 text-white">
                            <tr>
                                <th scope="col" className="hidden text-sm font-medium px-8 py-4 lg:table-cell">

                                </th>
                                <th scope="col" className="w-1/5 text-sm font-medium px-6 py-4">
                                    Name
                                </th>
                                <th scope="col" className="hidden lg:w-1/5 md:w-1/4 sm:w-1/3 px-6 py-4 text-sm font-medium md:table-cell">
                                    Street
                                </th>
                                <th scope="col" className="lg:pl-[2%] w-1/5 text-sm font-medium px-6 py-4">
                                    Contact-Number
                                </th>
                                <th scope="col" className="hidden lg:w-1/5 md:w-1/4 sm:w-1/3 px-6 py-4 text-sm font-medium lg:table-cell">
                                    Email
                                </th>
                                <th scope="col" className="lg:pl-5 pl-[3%] w-1/5 text-sm font-medium px-6 py-4">
                                    Checked  in
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <SkeletonMember />
                            ) : (
                                Object.entries(groupedUsers).map(([cpfSector, usersInGroup]) => (
                                    <React.Fragment key={cpfSector}>
                                        <tr>
                                            <td className="text-lg font-semibold px-6 py-4 text-left bg-gray-800 text-white border-b-2 border-zinc-200"
                                                colSpan="7"
                                                onClick={() => toggleGroupVisibility(cpfSector)}>
                                                <div className="flex items-center space-x-2">
                                                <FontAwesomeIcon icon={faHome} size="lg" className="mr-2" /> 
                                                    <span>{cpfSector}</span>
                                                    <span className="text-xs font-normal text-gray-300"> - ({usersInGroup.length} Members)</span>
                                                </div>
                                            </td>
                                        </tr>
                                        {usersInGroup.filter(filterUsers).map((user, index) => (
                                            <tr className={`w-screen pt-[.3%] bg-white border-b ${groupVisibility[cpfSector] ? '' : 'hidden'}`} key={user.id}>
                                                <td className="hidden pl-8 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 lg:table-cell">{index + 1}</td>
                                                <td className="w-1/5 text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap cursor-pointer hover:scale-105 hover:text-blue-600 hover:font-semibold" key={user.id}
                                                    onClick={() => userPublicProfile(user)}
                                                >
                                                    {user.name}
                                                </td>
                                                <td className="text-md  hidden lg:w-1/5 md:w-1/4 sm:w-1/3 whitespace-nowrap px-6 py-4 font-light text-gray-900 md:table-cell">
                                                    {user.address}
                                                </td>
                                                <td
                                                    type="number"
                                                    className="w-1/5 text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap border-none"
                                                >
                                                    {user.number}
                                                </td>
                                                <td className="text-md hidden lg:w-1/5 md:w-1/4 sm:w-1/3 whitespace-nowrap px-6 py-4 font-light text-gray-900 lg:table-cell">
                                                    {user.email}
                                                </td>
                                                <td className="w-1/5 text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <li className={user.checkedIn ? 'text-xl ml-4 text-lime-400' : 'text-xl ml-4 text-gray-900'} ></li>
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default Members;
