import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, setDoc, query, orderBy, onSnapshot, where, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SkeletonReport from "../Skeletons/SkeletonReport";
import { faFileAlt, faComments, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../index.css";

const IncidentReportPage = (props) => {
    const [reports, setReports] = useState([]);
    const reportsCollectionRef = collection(db, 'reports');
    const archivedReportsCollectionRef = collection(db, 'ArchivedReports');
    const [openedReports, setOpenedReports] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedReportComments, setSelectedReportComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [isCommentSectionExpanded, setIsCommentSectionExpanded] = useState(false);
    const defaultProfileAvatar = "/images/profileAvatar.png";
    const navigate = useNavigate();

    const addComment = async () => {
        if (commentText.trim() === "") {
            return;
        }
    
        try {
            const commentData = {
                text: commentText,
                timestamp: new Date(),
                uid: auth.currentUser.uid,
            };
    
            const userUID = auth.currentUser.uid;
            const userQuery = query(collection(db, 'users'), where('uid', '==', userUID));
            const userQuerySnapshot = await getDocs(userQuery);
    
            if (!userQuerySnapshot.empty) {
                const userData = userQuerySnapshot.docs[0].data();
                const userName = userData.name;
                const userProfileImage = userData.profileImage || defaultProfileAvatar;
                commentData.userName = userName;
                commentData.userProfileImage = userProfileImage;
            }
    
            const commentRef = collection(db, 'reports', selectedReport.id, 'comments');
            const commentDocRef = await addDoc(commentRef, commentData);
            commentData.commentId = commentDocRef.id;
            await setDoc(doc(db, 'reports', selectedReport.id, 'comments', commentDocRef.id), commentData);
    
            // Create a notification
            const notificationRef = collection(db, 'notifications');
            const notificationData = await addDoc(notificationRef, {
                type: 'newComment',
                reportId: selectedReport.id,
                userId: auth.currentUser.uid,
                timestamp: new Date(),
                title: 'New Comment',
                message: `There is a new comment on your ${selectedReport.title} report.`,
            });
            const notificationId = notificationData.id;
                console.log("New notification ID:", notificationId);

                await updateDoc(notificationData, { notificationId });
    
            setCommentText("");
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };   

    const deleteComment = async (commentId) => {
        try {
            const commentDocRef = doc(db, 'reports', selectedReport.id, 'comments', commentId);
            await deleteDoc(commentDocRef);
            // After successfully deleting the comment, you can update the UI as needed.
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const getCommentCountText = (count) => {
        if (count === 1) {
            return `${count} Comment`;
        } else {
            return `${count} Comments`;
        }
    };

    const formatTimeDifference = (timestamp) => {
        const now = new Date();
        const commentTime = new Date(timestamp);
        const timeDifference = now - commentTime;

        // Calculate the time difference in seconds, minutes, hours, and days
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        // Create a human-readable string based on the time difference
        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return 'Just now';
        }
    };

    const addReport = () => {
        navigate('../AddReport')
    }

    const moveReportsToArchived = async (reports) => {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const reportsToMove = reports.filter((report) => {
            const reportDate = new Date(report.dateReport);
            return reportDate < oneMonthAgo;
        });

        for (const report of reportsToMove) {
            const { id, ...reportData } = report;
            try {
                await addDoc(archivedReportsCollectionRef, reportData);
                const reportDocRef = doc(db, 'reports', id);
                await deleteDoc(reportDocRef);
            } catch (error) {
                console.error("Error moving report:", error);
            }
        }
    };

    const compareReportsByDate = (a, b) => {
        const dateA = new Date(a.dateReport);
        const dateB = new Date(b.dateReport);
        return dateB - dateA; // Sort in descending order (newest first)
    };

    const incrementViewCount = async (reportId) => {
        const reportRef = doc(db, 'reports', reportId);
        const reportDoc = await getDoc(reportRef);

        if (reportDoc.exists()) {
            const currentViewCount = reportDoc.data().viewCount || 0;
            const updatedViewCount = currentViewCount + 1;

            // Update the viewCount in the database
            await updateDoc(reportRef, { viewCount: updatedViewCount });
        }
    };

    const handleReportClick = async (report) => {
        
        if (!openedReports.has(report.id)) {
            await incrementViewCount(report.id);
            setOpenedReports(new Set([...openedReports, report.id]));
        }
    
        setSelectedReport(report);
    }; 

    useEffect(() => {
        return () => {
            setOpenedReports(new Set());
        };
    }, []);
    
    
    useEffect(() => {
        if (selectedReport) {
            const commentRef = collection(db, 'reports', selectedReport.id, 'comments');
            const q = query(commentRef, orderBy("timestamp"));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const comments = snapshot.docs.map((doc) => {
                    const commentData = doc.data();
                    commentData.timestamp = commentData.timestamp.toDate();
                    return commentData;
                });

                // Update the selectedReportComments state
                setSelectedReportComments(comments);
            });

            return () => unsubscribe();
        }
    }, [selectedReport]);

    useEffect(() => {
        const getReports = async () => {
            const reportData = await getDocs(reportsCollectionRef);
            setReports(reportData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setIsLoading(false);

            moveReportsToArchived(reports);
        };

        getReports();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (props.funcNav) {
            props.funcNav(true)
        }
    })

    return (
        <main className="flex flex-col bg-zinc-200 min-h-screen">
            <div className="pt-24">
                <h1 className="grid text-4xl place-content-center font-semibold underline underline-offset-8 decoration-2 decoration-gray-800 mb-10 text-gray-800">Incident Report's</h1>
            </div>
            <div className="mx-auto max-w-screen-lg mb-5 lg:w-full lg:pl-16 lg:pr-16">
                <div className="flex flex-col md:flex-row justify-between lg:pl-3 lg:pr-3">
                    <div className="bg-gray-100 rounded border border-gray-800 flex items-center drop-shadow-md mb-3 md:mb-0 md:mr-3">
                        <button className="py-2 px-4 bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r text-zinc-200 rounded-l border-r border-gray-200 hover:bg-gray-700 active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none">
                            Search
                        </button>
                        <input
                            type="search"
                            placeholder="Report Name"
                            className="bg-transparent py-1 text-gray-600 px-4 focus:outline-gray-800 w-full border-none "
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                        />
                    </div>
                    <button
                        className="bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 hover:drop-shadow-2xl text-zinc-200 font-bold py-2 px-4 rounded"
                        onClick={addReport}
                    >
                        Add Report
                    </button>
                </div>
            </div>
            <div className="lg:ml-[27.5%] lg:mr-[27.5%] ml-[10%] mr-[10%] mb-5">
                <p>All Incident report's are displayed here. Registered patroller's have access to all report's that are currently posted. To search for a report input either the name of the report, the patroller who created the report or the full date of when the report was created above, exp. (2023-03-24). Reports automatically get moved to archived reports after 1 month.</p>
            </div>
            {isLoading ? (
                <SkeletonReport />
            ) : reports.length === 0 ? (
                <p className="text-center lg:text-2xl md:text-2xl text-lg font-semibold">No Reports Currently Displayed</p>
            ) :
                // eslint-disable-next-line array-callback-return
                reports.filter((value) => {
                    if (searchTerm === "") {
                        return value;
                    } else if (
                        value.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        value.dateReport.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        value.patrollerName.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                        return value;
                    }
                })
                    .sort(compareReportsByDate)
                    .map((report, index) => {
                        const commentCount = selectedReportComments.length;
                        const commentCountText = getCommentCountText(commentCount);
                        return <div class="flex flex-col items-center mb-3 lg:mr-[25%] lg:ml-[25%] md:ml-[4%] md:mr-[4%]">
                            <div class="w-full pr-10 pl-10">
                                <input type="checkbox" name="panel" id={`panel-${index + 1}`} class="hidden" />
                                <label
                                    for={`panel-${index + 1}`}
                                    class="relative block bg-gray-800  text-zinc-200 p-4 shadow-md accordion rounded-tl-lg rounded-tr-lg hover:bg-gray-700 font-semibold"
                                    onClick={() => {
                                        setSelectedReport(report);
                                        handleReportClick(report);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faFileAlt} className="mr-4" />
                                    {report.title}
                                </label>
                                {selectedReport?.id === report.id && (
                                    <div class="accordion__content overflow-hidden bg-gray-100 transition duration-500 ease-in-out">
                                        <div class="bg-white p-5 md:p-10 rounded-br-lg rounded-bl-lg shadow-xl shadow-gray-500 border border-blue-800">
                                            <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                                                <h1 class="text-xl md:text-2xl mb-3 md:mb-6 font-semibold underline underline-offset-4 decoration-1 text-black text-center">{report.title}</h1>
                                                <div class="flex items-end pb-4 md:pb-0">
                                                    <h1 class="font-semibold mr-2 text-black">Date of report:</h1>
                                                    <h1>{report.dateReport}</h1>
                                                </div>
                                            </div>
                                            <p class="mb-5 md:mb-10 whitespace-pre-line">{report.description}</p>
                                            <div class="flex flex-col md:flex-row justify-between">
                                                <div class="mb-5 md:mb-0 md:mr-5">
                                                    <div class="flex mb-2">
                                                        <h1 class="font-semibold mr-2 text-black">Patroller's name:</h1>
                                                        <h1>{report.patrollerName}</h1>
                                                    </div>
                                                    <div class="flex mb-2">
                                                        <h1 class="font-semibold mr-2 text-black">Location:</h1>
                                                        <h1>{report.location}</h1>
                                                    </div>
                                                    <div class="flex mb-2">
                                                        <h1 class="font-semibold mr-2 text-black">Date of incident:</h1>
                                                        <h1>{report.date}</h1>
                                                    </div>
                                                    <div class="flex mb-2">
                                                        <h1 class="font-semibold mr-2 text-black">Referance number:</h1>
                                                        <h1>{report.policeNumber}</h1>
                                                    </div>
                                                    <div class="flex">
                                                        <h1 class="font-semibold mr-2 text-black">Time of incident:</h1>
                                                        <h1>{report.time}</h1>
                                                    </div>
                                                </div>
                                                <div class="flex items-end">
                                                    {/*
                                                <button class="bg-blue-500 hover:drop-shadow-2xl text-white font-bold py-2 px-4 rounded mr-2 shadow-xl hover:scale-125" onClick={() => handleEdit(report.docId)}>
                                                    Edit
                                                </button>
                            */}

                                                </div>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <h1 className="mr-2">{report.viewCount || 0}</h1>
                                                <h1 className="font-semibold text-gray-500 text-sm">Views</h1>
                                            </div>
                                            <div className="text-gray-400 mt-3">
                                                <button
                                                    onClick={() => setIsCommentSectionExpanded(!isCommentSectionExpanded)}
                                                    className="cursor-pointer text-blue-600 font-semibold hover:scale-105 hover:text-blue-700"
                                                >
                                                    <FontAwesomeIcon icon={faComments} className="mr-2" />
                                                    {selectedReportComments.length === 0
                                                        ? "Currently no comments, click here to post a new comment"
                                                        : commentCountText}
                                                </button>
                                            </div>
                                            {isCommentSectionExpanded && (
                                                <div
                                                    className={`mt-4 transition-max-height ease-in-out duration-300 overflow-hidden ${isCommentSectionExpanded ? "max-h-auto" : "max-h-0"
                                                        }`}
                                                >
                                                    <div className="pb-4 pl-4 pr-4">
                                                        {selectedReportComments.length > 0 && (
                                                            <div>
                                                                <ul>
                                                                    {selectedReportComments.slice().reverse().map((comment, index) => (
                                                                        <li key={index} className="flex flex-col mb-5">
                                                                            <div>
                                                                                <div className="flex justify-between">
                                                                                    <div className="flex">
                                                                                        <img
                                                                                            src={comment.userProfileImage}
                                                                                            alt="User Profile"
                                                                                            className="w-8 h-8 rounded-full mr-2"
                                                                                        />
                                                                                        <div className="flex flex-col mt-auto">
                                                                                            <div className="font-semibold"> {comment.userName}</div>
                                                                                        </div>
                                                                                    </div>
                                                                                    {auth.currentUser && comment.uid === auth.currentUser.uid && (
                                                                                        <button
                                                                                            onClick={() => deleteComment(comment.commentId)}
                                                                                            className="cursor-pointer text-red-600"
                                                                                        >
                                                                                            <FontAwesomeIcon icon={faTrash} className="text-red-600" />
                                                                                        </button>
                                                                                    )}
                                                                                </div>
                                                                                <div className="ml-10">{comment.text}</div>
                                                                            </div>
                                                                            <div>
                                                                                <span className="font-semibold text-sm ml-10">Posted:</span>
                                                                                <span className="text-gray-500 text-sm"> {formatTimeDifference(comment.timestamp)}</span>
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                        <div className="mt-4">
                                                            <textarea
                                                                placeholder="Add a comment..."
                                                                rows="4"
                                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={commentText}
                                                                onChange={(e) => setCommentText(e.target.value)}
                                                            />
                                                            <button
                                                                className="mt-2 bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 text-white py-2 px-4 rounded-md"
                                                                onClick={addComment}
                                                            >
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    })}
        </main>
    )
}

export default IncidentReportPage;