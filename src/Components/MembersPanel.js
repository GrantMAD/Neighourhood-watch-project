import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SkeletonMember from "../Skeletons/SkeletonMember";
import emailjs from 'emailjs-com';

const MembersPanel = () => {
    const [users, setUsers] = useState([]);
    const [sectorOptions, setSectorOptions] = useState([]); // New state for neighborhood options
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const usersCollectionRef = collection(db, "users");
    const sectorOptionsRef = collection(db, "SectorOptions"); // Reference to SectorOptions collection
    const [editingStreet, setEditingStreet] = useState(null); // Track editing street state
    const [editedStreet, setEditedStreet] = useState(""); // Track the new street input
    const [editingNumber, setEditingNumber] = useState(null); // Track editing number state
    const [editedNumber, setEditedNumber] = useState(""); // Track the new number input
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
        getSectorOptions(); // Fetch neighborhood options
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUsers = async () => {
        try {
            const data = await getDocs(usersCollectionRef);
            const sortedUsers = data.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }))
                .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
            setUsers(sortedUsers);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const getSectorOptions = async () => {
        try {
            const data = await getDocs(sectorOptionsRef);
            const options = data.docs.map((doc) => doc.data().NeighbourhoodOptions).flat();
            setSectorOptions(options); // Set the neighborhood options
        } catch (error) {
            console.error("Error fetching sector options:", error);
        }
    };

    const updateUserCpfSector = async (userId, newSector) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            await updateDoc(userDocRef, { cpfSector: newSector });

            // Update local state
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, cpfSector: newSector } : user
                )
            );
        } catch (error) {
            console.error('Error updating cpfSector:', error);
        }
    };

    const userPublicProfile = (user) => {
        navigate(`/PublicProfile/${user.id}`, {
            state: { selectedUser: user },
        });
    };

    const filterUsers = (user) => {
        if (searchTerm === "") {
            return true;
        } else {
            return user.name.toLowerCase().includes(searchTerm.toLowerCase());
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const sendApprovalEmail = async (recipientEmail) => {
        console.log('Recipient Email:', recipientEmail);

        const templateParams = {
            to_email: recipientEmail,
            subject: 'Account Approval',
            message: 'Your account has been approved. You now have full access to Sector 2 https://neighbourhoodwatchapp.com/'
        };

        try {
            const response = await emailjs.send('service_eclqt7c', 'template_dvj9a18', templateParams, 'soAbfXEvIO-hm50JH');
            console.log('Approval email sent successfully', response);
        } catch (error) {
            console.error('Error sending approval email:', error);
        }
    };

    const updateUserRole = async (userId, newRole) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                const userToUpdate = userDocSnapshot.data();

                // Update the role in the Firestore document
                await updateDoc(userDocRef, { role: newRole });

                // Check if the new role is "user" and if the user has an email
                if (newRole === 'user' && userToUpdate.email) {
                    await sendApprovalEmail(userToUpdate.email);
                }

                // Update the local state if needed
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === userId ? { ...user, role: newRole } : user
                    )
                );
            } else {
                console.log(`User with ID ${userId} not found.`);
            }
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    const updateUserAddress = async (userId, newAddress) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            await updateDoc(userDocRef, { address: newAddress });

            // Update local state
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, address: newAddress } : user
                )
            );
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };

    const handleStreetEdit = (user) => {
        setEditingStreet(user.id); // Set the currently editing user's id
        setEditedStreet(user.address || ""); // Initialize the input with the user's current address
    };

    const saveEditedStreet = (user) => {
        if (editedStreet !== "") {
            updateUserAddress(user.id, editedStreet); // Update Firestore with the new street
            setEditingStreet(null); // Exit edit mode after saving
        }
    };

    const updateUserNumber = async (userId, newNumber) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            await updateDoc(userDocRef, { number: newNumber });

            // Update local state
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, number: newNumber } : user
                )
            );
        } catch (error) {
            console.error('Error updating number:', error);
        }
    };

    const handleNumberEdit = (user) => {
        setEditingNumber(user.id); // Set the currently editing user's id for number
        setEditedNumber(user.number || ""); // Initialize the input with the user's current number
    };

    const saveEditedNumber = (user) => {
        if (editedNumber !== "") {
            updateUserNumber(user.id, editedNumber); // Update Firestore with the new number
            setEditingNumber(null); // Exit edit mode after saving
        }
    };

    return (
        <main className="min-h-screen bg-zinc-200">
            <div className="pt-24">
                <h1 className="grid text-gray-800 text-4xl place-content-center font-semibold underline underline-offset-8 decoration-2 decoration-gray-800 mb-10">
                    Members Panel
                </h1>
            </div>
            <div>
                <div className="ml-5 mr-5">
                    <div className="bg-gray-100 rounded border border-gray-800 flex items-center drop-shadow-md w-full sm:w-3/12 md:w-4/12 lg:w-2/12">
                        <button className="py-2 px-4 bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r text-zinc-200 rounded-l border-r border-gray-200 hover:bg-gray-700 active:bg-gray-200 disabled:opacity-50 inline-flex items-center">
                            Search
                        </button>
                        <input
                            type="search"
                            placeholder="User name"
                            className="bg-transparent py-1 text-gray-600 px-4 focus:outline-gray-800 w-full border-none"
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="mt-3 pb-3">
                        <p>
                            This page is only accessible to admins. To search for a specific user input their name into the search bar above. To change a users neighbourhood watch click on the dropdown in that users row and select the prefered neighbourhood watch. <br /> To change a users role click on the arrow in the dropdown and select the desired role. To edit a users street or number click on that users current street or number value and edit/add the new value and click save.
                        </p>
                    </div>
                </div>
                <div className="pt-4 overflow-hidden">
                    <table className="text-center">
                        <thead className="pl-[1%] border-b bg-gray-800">
                            <tr>
                                <th scope="col" className="hidden text-sm font-medium text-white px-6 py-4 lg:table-cell"></th>
                                <th scope="col" className="w-1/6 text-sm font-medium text-white px-6 py-4">Name</th>
                                <th scope="col" className="hidden lg:w-1/6 md:w-1/4 sm:w-1/3 px-6 py-4 text-sm font-medium text-white lg:table-cell">User's role</th>
                                <th scope="col" className="hidden lg:w-1/6 md:w-1/4 sm:w-1/3 px-6 py-4 text-sm font-medium text-white md:table-cell">Street</th>
                                <th scope="col" className="hidden lg:w-1/6 md:w-1/4 sm:w-1/3 px-6 py-4 text-sm font-medium text-white lg:table-cell md:table-cell">Neighbourhood Watch</th>
                                <th scope="col" className="hidden lg:w-1/6 md:w-1/4 sm:w-1/3 px-6 py-4 text-sm font-medium text-white lg:table-cell md:table-cell">Number</th>
                                <th scope="col" className="lg:pl-[2%] w-1/6 text-sm font-medium text-white px-6 py-4">Checked in</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <SkeletonMember />
                            ) : (
                                users.filter(filterUsers).map((user, index) => (
                                    <tr className=" w-screen pt-[.3%] bg-white border-b" key={user.id}>
                                        <td className="hidden pl-8 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 lg:table-cell">{index + 1}</td>
                                        <td className="w-1/6 text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap cursor-pointer hover:scale-125" onClick={() => userPublicProfile(user)}>{user.name}</td>
                                        <td className="text-md hidden lg:w-1/6 md:w-1/4 sm:w-1/3 whitespace-nowrap px-6 py-4 font-light text-gray-900 lg:table-cell">
                                            {user.role === "admin" ? (
                                                <span>Admin</span>
                                            ) : (
                                                <select
                                                    className="rounded-md text-center ring-4 ring-gradient-to-l from-blue-800 to-violet-600"
                                                    value={user.role}
                                                    onChange={(e) => updateUserRole(user.id, e.target.value)}
                                                >
                                                    <option value="admin">Admin</option>
                                                    <option value="user">User</option>
                                                </select>
                                            )}
                                        </td>
                                        <td className="text-md hidden lg:w-1/6 md:w-1/4 sm:w-1/3 whitespace-nowrap px-6 py-4 font-light text-gray-900 lg:table-cell">
                                            {editingStreet === user.id ? (
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={editedStreet}
                                                        onChange={(e) => setEditedStreet(e.target.value)}
                                                        className="border border-gray-400 rounded p-2"
                                                    />
                                                    <button
                                                        onClick={() => saveEditedStreet(user)}
                                                        className="ml-2 text-blue-500"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingStreet(null)} // Exit edit mode without saving
                                                        className="ml-2 text-blue-800 font-bold"
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            ) : (
                                                <span onClick={() => handleStreetEdit(user)} className="cursor-pointer hover:underline">
                                                    {user.address || "No street information"}
                                                </span>
                                            )}
                                        </td>
                                        <td className="text-md hidden lg:w-1/6 md:w-1/4 sm:w-1/3 whitespace-nowrap px-6 py-4 font-light text-gray-900 lg:table-cell">
                                            <select
                                                className="rounded-md text-center ring-4 ring-gradient-to-l from-blue-800 to-violet-600"
                                                value={user.cpfSector || ""}
                                                onChange={(e) => updateUserCpfSector(user.id, e.target.value)}
                                            >
                                                <option value="">Select Neighborhood Watch</option>
                                                {sectorOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="text-md hidden lg:w-1/6 md:w-1/4 sm:w-1/3 whitespace-nowrap px-6 py-4 font-light text-gray-900 lg:table-cell">
                                            {editingNumber === user.id ? (
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={editedNumber}
                                                        onChange={(e) => setEditedNumber(e.target.value)}
                                                        className="border border-gray-400 rounded p-2"
                                                    />
                                                    <button
                                                        onClick={() => saveEditedNumber(user)}
                                                        className="ml-2 text-blue-500"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingNumber(null)} // Exit edit mode without saving
                                                        className="ml-2 text-blue-800 font-bold"
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            ) : (
                                                <span onClick={() => handleNumberEdit(user)} className="cursor-pointer hover:underline">
                                                    {user.number || "No number information"}
                                                </span>
                                            )}
                                        </td>
                                        <td className="w-1/6 text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <li
                                                className={
                                                    user.checkedIn
                                                        ? "text-xl lg:ml-8 md:ml-5 ml-3 text-lime-400"
                                                        : "text-xl lg:ml-8 md:ml-5 ml-5 text-gray-900"
                                                }
                                            ></li>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default MembersPanel;
