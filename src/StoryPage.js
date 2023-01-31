import { useNavigate } from "react-router-dom";

const StoryPage = () => {
    const navigate = useNavigate();
    
      const updateReport = async (id) => {
        navigate('/Dashboard')
      }

      return (
        <main className="h-screen pt-10 pb-10 pr-60 pl-60 bg-zinc-200">
          <div className="mt-10 mb-10 p-10 text-gray-800 rounded-md shadow-lg shadow-gray-500">
            <div className="flex justify-center">
              <h1 className="text-5xl mb-5 font-semibold text-gray-800">Title</h1>
            </div>
            <div className="flex justify-center">
                <hr className="mb-10 border-gray-800 w-1/4"></hr>
            </div>
            
                <img
                    className="float-right h-1/4 w-1/4 mt-5 mb-8 rounded-md shadow-lg shadow-gray-500 ml-5"
                    alt=""
                    src="/images/storyImage.jpg"
                    />
            
            <div>
                <p className="text-gray-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas quam non orci gravida efficitur. Praesent dictum nulla quis dolor faucibus convallis. Ut eleifend varius scelerisque. Proin facilisis posuere purus, a viverra risus suscipit eget. Aliquam tempor mauris purus, sit amet rutrum ligula pulvinar vitae. In tempor, mauris nec ultricies imperdiet, neque tortor fringilla nisl, ac vulputate diam orci id dui. Cras vitae ipsum interdum metus dictum elementum. Nunc et nisi at nulla porttitor interdum in porttitor felis. Curabitur facilisis, arcu sed dictum tristique, massa nunc scelerisque turpis, eget tempus sem velit id nulla. Duis efficitur tortor vel felis facilisis, sed sagittis metus tempor. Aenean tristique pretium venenatis.

Phasellus ut felis hendrerit, auctor nisi in, aliquam dui. Aenean lorem mauris, tincidunt sit amet mi eu, varius faucibus metus. Morbi dictum lacinia nisl id vulputate. Sed pretium orci vel tellus accumsan molestie. Quisque vestibulum elit nec efficitur malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut massa lectus, pharetra ullamcorper fermentum vel, mattis eu dui. Nunc volutpat porttitor neque vitae luctus.

In non turpis laoreet nunc ornare ultrices. Nam massa tellus, finibus vitae libero sit amet, egestas ullamcorper metus. Praesent cursus semper mauris non elementum. Nam purus sapien, fermentum aliquam ultrices in, venenatis non nunc. Duis et laoreet nunc, id pharetra lectus. Donec eu velit est. In facilisis, elit nec rhoncus pretium, mi justo ultricies elit, ac sagittis sem elit in lacus. Quisque ac leo blandit, eleifend ligula nec, varius massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean commodo aliquam libero vitae convallis. In finibus nisl et lacus sollicitudin venenatis. Donec ex est, lobortis et viverra at, sagittis in elit. Donec pharetra libero nec tristique semper. Morbi ultrices porttitor enim. Morbi posuere eros ante, id gravida quam bibendum tempor.

Donec id euismod elit, quis faucibus diam. Mauris fermentum sit amet mi porttitor suscipit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec finibus ligula quis magna scelerisque, id egestas ante malesuada. Sed iaculis, turpis ut tempus pretium, metus erat eleifend felis, quis pretium justo enim a augue. Donec pharetra ac quam vitae mattis. Ut volutpat in sapien ut cursus. Nam sed purus vulputate, auctor dui et, aliquet felis. Pellentesque id rutrum nisl, eu eleifend odio.

Nullam luctus, erat eu vulputate dignissim, orci purus fermentum mi, sed condimentum justo diam id lectus. Sed sodales eu magna nec imperdiet. Donec sit amet augue ultricies, tincidunt felis sed, lobortis augue. Fusce vitae dictum justo. Aliquam erat volutpat. Fusce ut mauris facilisis, viverra est elementum, rhoncus lorem. Praesent malesuada, felis vitae euismod placerat, nisi lectus mollis metus, a rutrum dui nisl blandit metus. Etiam commodo ex lectus, id molestie velit efficitur et. Nunc velit quam, eleifend ac suscipit id, accumsan rutrum dolor.

Proin finibus sit amet sapien eget ullamcorper. Donec fermentum justo sed nisl facilisis luctus. Nunc vel mauris nec nulla varius tempor in vel risus. Vestibulum maximus.</p>
            </div>
            <div className="flex justify-end items-end mb-3 mt-5">
                <button
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 shadow-xl"
                  onClick={updateReport}
                >
                  Edit
                </button>         
              </div>
          </div>
        </main>
      )
}

export default StoryPage;