import React from "react";

const SkeletonMember = () => {
    return (
        
            <div role="status" class="flex flex-row p-4 space-y-4 divide-y divide-gray-200 rounded animate-pulse">
                <div class="flex items-center">
                    <div>
                        <div className="flex">
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-2.5 mr-24 ml-10 animate-pulse"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-60 mb-2.5 mr-24 animate-pulse"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-60 mb-2.5 mr-24 animate-pulse"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-60 mb-2.5 mr-24 animate-pulse"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-60 mb-2.5  mr-24 animate-pulse"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-60 mb-2.5 mr-24 animate-pulse"></div>
                            <div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-2.5 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        




    );
};

export default SkeletonMember;