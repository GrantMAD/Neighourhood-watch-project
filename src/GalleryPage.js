import { useEffect, useState } from "react";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { useNavigate } from "react-router-dom";
import SkeletonImage from "./Skeletons/SkeletonImage";

const GalleryPage = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const imageRef = ref(storage, 'galleryImages/');
        listAll(imageRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url])
                    setIsLoading(false);
                })
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addImage = () => {
        navigate('/Dashboard')
    }

    return (
        <main className="h-100% bg-zinc-200">
            <div className="grid pt-24 place-content-center">
                <h1 className="text-4xl text-gray-800 font-semibold underline underline-offset-8 decoration-1">Gallery</h1>
            </div>
            <section className="overflow-hidden text-gray-700">
                <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32 border-solid mb-10">
                    <div className="flex justify-end mb-5">
                        <button
                            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 shadow-xl hover:scale-125 ..."
                            onClick={addImage}
                        >
                            Add new image
                        </button>

                    </div>
                        <p className="mb-5">The image's displayed here are all from past event's that have happened. All image's are posted by admin's only. To enlarge an image hover over it.</p>
                    <div className="flex flex-wrap m-1 md:-m-2">
                        {isLoading ? (
                            <SkeletonImage />
                        ) :
                            imageUrls.map((url) => {
                                return <div className="flex flex-wrap w-1/3">
                                    <div className="w-full p-1 md:p-2 object-constain">
                                        <img
                                            alt="gallery"
                                            src={url}
                                            className="w-[416px] h-[277px] rounded-xl shadow-lg shadow-gray-500 hover:scale-150 border-2 border-gray-800"
                                        />
                                    </div>
                                </div>
                            })}
                    </div>
                </div>
               {/*<div className="flex justify-center max-w-2xl mx-auto mb-10">
                    <nav aria-label="Page navigation example">
                        <ul className="inline-flex -space-x-px shadow-xl">
                            <li>
                                <a href="/#" aria-current="page"
                                    className="bg-white border border-gray-300 text-gray-500  hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                            </li>
                            <li>
                                <a href="/#"
                                    className="bg-blue-50 border border-gray-300 text-blue-600 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                            </li>
                            <li>
                                <a href="/#"
                                    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                            </li>
                            <li>
                                <a href="/#"
                                    className="bg-white border border-gray-300 text-gray-500 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                            </li>
                            <li>
                                <a href="/#"
                                    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                            </li>
                            <li>
                                <a href="/#"
                                    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                            </li>
                            <li>
                                <a href="/#"
                                    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                */}
            </section>
        </main>
    )
}

export default GalleryPage;