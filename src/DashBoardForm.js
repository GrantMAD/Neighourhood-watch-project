import { useState } from "react"
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { storage } from "./firebase";
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from "react-router-dom";

const DashBoardForm = () => {
  const [newTitle, setNewTitle] =useState();
  const [newPatrollerName, setNewPatrollerName] =useState();
  const [newTime, setNewTime] =useState();
  const [newDate, setNewDate] =useState();
  const [newDateReport, setNewDateReport] =useState();
  const [newLocation, setNewLocation] =useState();
  const [newDescription, setNewDescription] =useState();
  const [imageUpload, setImageUpload] = useState();
  const navigate = useNavigate();
  const usersCollecctionRef = collection(db, "reports");

  const UpdateReport = async (e) => {
    e.preventDefault();
    await addDoc(usersCollecctionRef, { title: newTitle, patrollerName: newPatrollerName, time: newTime, date: newDate, dateReport: newDateReport, location: newLocation, description: newDescription });
  }

  const uploadImage = (e) => {
    e.preventDefault();
    if (imageUpload == null) return;

    const imageRef = ref(storage, `galleryImages/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      navigate('/GalleryPage')
    })
  };

    return (
      <>
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Add Images to Gallery</h3>
                <p className="mt-1 text-sm text-gray-600">
                  To add images to gallery page, add file's to input
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div>
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        Image Input
                      </label>
                      <div class="flex justify-center">
                        <div class="mb-3 w-96">
                            <label for="formFileMultiple" class="form-label inline-block mb-2 text-gray-700">Input files here</label>
                            <input 
                              class="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-500
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                              type="file" 
                              id="formFileMultiple"
                              multiple
                              onChange={(event) => {
                                setImageUpload(event.target.files[0]);
                              }}
                              />
                        </div>
                        </div>
                    </div>
                  </div>
                  <div className="bg-white px-4 py-3 text-right sm:px-6">
                    <button
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={uploadImage}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
  
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
  
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Incident Report</h3>
                <p className="mt-1 text-sm text-gray-600">To create incident report add information in inputs</p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label 
                          htmlFor="title" 
                          className="block text-sm font-medium text-gray-700"
                          >
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          autoComplete="title"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(event) => {
                            setNewTitle(event.target.value);
                          }}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <div class="flex">
                            <div class="mb-3 xl:w-96">
                                <label for="name" class="form-label inline-block mb-2 font-medium text-gray-700"
                                >Patroller's name</label>
                                <input
                                type="text"
                                class="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                id="PatrollersName"
                                placeholder="Name"
                                onChange={(event) => {
                                  setNewPatrollerName(event.target.value);
                                }}
                                />
                            </div>
                        </div>
                      </div>
  
                      <div className="col-span-6 sm:col-span-4">
                        <div class="flex">
                            <div class="mb-3 xl:w-96">
                                <label for="Time" class="form-label inline-block mb-2 font-medium text-gray-700"
                                >Time of Incident</label>
                                <input
                                type="number"
                                class="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                id="time"
                                placeholder="Time"
                                onChange={(event) => {
                                  setNewTime(event.target.value);
                                }}
                                />
                            </div>
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-4">
                        <div class="flex">
                            <div class="mb-3 xl:w-96">
                                <label for="date" class="form-label inline-block mb-2 font-medium text-gray-700"
                                >Date of Incident</label>
                                <input
                                type="Date"
                                class="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                id="DateOfIncident"
                                onChange={(event) => {
                                  setNewDate(event.target.value);
                                }}
                                />
                            </div>
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-4">
                        <div class="flex">
                            <div class="mb-3 xl:w-96">
                                <label for="Time" class="form-label inline-block mb-2 font-medium text-gray-700"
                                >Date of Report</label>
                                <input
                                type="Date"
                                class="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                id="DateOfReport"
                                onChange={(event) => {
                                  setNewDateReport(event.target.value);
                                }}
                                />
                            </div>
                        </div>
                      </div>
  
                      <div className="col-span-6">
                        <label htmlFor="Location-of-incident" className="block text-sm font-medium text-gray-700">
                          Location of Incident
                        </label>
                        <input
                          type="text"
                          name="LocationOfIncident"
                          id="LocationOfIncident"
                          autoComplete="Location-of-incident"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(event) => {
                            setNewLocation(event.target.value);
                          }}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-4">
                      <div class="flex">
                        <div class="mb-3 xl:w-96">
                            <label for="incident-desciption" class="form-label inline-block mb-2 font-medium text-gray-700">Incident Desciption</label>
                            <textarea
                            type="text"
                            class="
                                form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                resize 
                            "
                            id="incidentDesciption"
                            rows="10"
                            placeholder="Desciption"
                            onChange={(event) => {
                              setNewDescription(event.target.value);
                            }}
                            ></textarea>
                            <h1 class="text-xs">To make the window larger click and drag the bottem right corner</h1>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white px-4 py-3 text-right sm:px-6">
                    <button
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={UpdateReport}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
  
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
  
        
      </>
    )
  }

export default DashBoardForm
  