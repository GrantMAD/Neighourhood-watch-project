const Members = () => {

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
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Rohan
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        64 Ballarat Road
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        074 444 1804
                                    </td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Rohan
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        64 Ballarat Road
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        074 444 1804
                                    </td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Rohan
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        64 Ballarat Road
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        074 444 1804
                                    </td>
                                    </tr>
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