import CreateDestinationButton from "./components/create-destination-button"
import DestinationTable from "./components/destination-table"

const page = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div></div>
        <CreateDestinationButton />
      </div>
      <DestinationTable />
    </>
  )
}

export default page
