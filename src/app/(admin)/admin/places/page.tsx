import CreatePlaceButton from "./components/create-place-button"
import PlaceTable from "./components/place-table"

const page = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div></div>
        <CreatePlaceButton />
      </div>
      <PlaceTable />
    </>
  )
}

export default page
