import DashBoardForm from "./DashBoardForm"

const DashBoard = () => {

  return (
    <main className="p-10 bg-zinc-200">
      <h1 className="grid text-4xl place-content-center font-semibold underline underline-offset-8 decoration-1 mb-10">DashBoard</h1>
      <DashBoardForm />
    </main>
  )
}

export default DashBoard;