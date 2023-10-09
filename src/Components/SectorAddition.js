import { useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Toaster, toast } from 'sonner';

const NeighbourhoodAddition = () => {
  const [newNeighbourhood, setNewNeighbourhood] = useState('');

  const handleAddNeighbourhood = async () => {
    if (newNeighbourhood.trim() !== '') {
      const sectorOptionsRef = doc(db, 'SectorOptions', 'kEbia4X43HuZk6d1FsBp');
      await updateDoc(sectorOptionsRef, {
        NeighbourhoodOptions: arrayUnion(newNeighbourhood)
      });

      setNewNeighbourhood('');
    }
  };

  return (
    <main className="min-h-screen p-10 bg-zinc-200">
      <h1 className="grid text-4xl place-content-center font-semibold underline underline-offset-8 decoration-2 decoration-blue-700 mb-10 mt-8 pt-10">Sector Addition's</h1>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Neighbourhood</h3>
              <p className="mt-1 text-sm text-gray-600">
                To add a new Neighbourhood to the list input the neighbourhood's name and save
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="bg-white">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 after:content-none">
                          Neighbourhood
                        </label>
                        <input
                          type="text"
                          name="neighbourhoodName"
                          id="neighbourhoodName"
                          autoComplete="neighbourhoodName"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => setNewNeighbourhood(e.target.value)}
                          placeholder="Enter neighborhood name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <Toaster richColors />
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddNeighbourhood();
                      toast.success('Adding new neighbourhood, Please wait.');
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default NeighbourhoodAddition;
