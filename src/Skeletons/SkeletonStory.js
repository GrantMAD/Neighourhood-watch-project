import React from "react";

const SkeletonStory = () => {
    return (
        <div>
            <div className="flex flex-col">
            <hr className="mb-5 mt-5"></hr>
            <div className="w-60 h-6 bg-gray-400 rounded-lg mt-4 mb-5 animate-pulse shadow-inner shadow-gray-500" />
            <div className="flex flex-row justify-between">
                <div  className="w-full">
                    <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
                        <div class="flex items-center w-full space-x-2">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-32 shadow-inner shadow-gray-500"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-24 shadow-inner shadow-gray-500"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full shadow-inner shadow-gray-500"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[480px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-full shadow-inner shadow-gray-500"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full shadow-inner shadow-gray-500"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-24 shadow-inner shadow-gray-500"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[400px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full shadow-inner shadow-gray-500"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-80 shadow-inner shadow-gray-500"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full shadow-inner shadow-gray-500"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[480px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-full shadow-inner shadow-gray-500"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full shadow-inner shadow-gray-500"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-24 shadow-inner shadow-gray-500"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[440px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-32 shadow-inner shadow-gray-500"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-24 shadow-inner shadow-gray-500"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-full shadow-inner shadow-gray-500"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[360px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full shadow-inner shadow-gray-500"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-80 shadow-inner shadow-gray-500"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full shadow-inner shadow-gray-500"></div>
                        </div>
                        
                        
                       
                    </div>

                </div>
                <div className="float-right mb-10">
                    <div class="flex items-center justify-center w-full h-48 bg-gray-400 rounded sm:w-96 dark:bg-gray-700 shadow-inner shadow-gray-500">
                        <svg class="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                    </div>
                </div>
            </div>

        </div>
        <div className="flex flex-col">
            <hr className="mb-5"></hr>
            <div className="w-60 h-6 bg-gray-400 rounded-lg mt-4 mb-5 animate-pulse" />
            <div className="flex flex-row justify-between">
                <div  className="w-full">
                    <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
                        <div class="flex items-center w-full space-x-2">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-32"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-24"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[480px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-full"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-24"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[400px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-80"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[480px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-full"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-24"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[440px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-32"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-24"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-full"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[360px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-80"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-32"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-24"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[480px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-full"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-24"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[400px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-80"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                    </div>

                </div>
                <div className="float-right">
                    <div class="flex items-center justify-center w-full h-48 bg-gray-400 rounded sm:w-96 dark:bg-gray-700">
                        <svg class="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                    </div>
                </div>
            </div>

        </div>
        <div className="flex flex-col">
            <hr className="mb-5"></hr>
            <div className="w-60 h-6 bg-gray-400 rounded-lg mt-4 mb-5 animate-pulse" />
            <div className="flex flex-row justify-between">
                <div  className="w-full">
                    <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
                        <div class="flex items-center w-full space-x-2">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-32"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-24"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[480px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-full"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-24"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[400px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-80"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[480px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-full"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-24"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[440px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-32"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-24"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-full"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[360px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-80"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-32"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-24"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[480px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-full"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-24"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2 max-w-[400px]">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-80"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                    </div>

                </div>
                <div className="float-right">
                    <div class="flex items-center justify-center w-full h-48 bg-gray-400 rounded sm:w-96 dark:bg-gray-700">
                        <svg class="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                    </div>
                </div>
            </div>

        </div>
        </div>
        
        
    );
};

export default SkeletonStory;