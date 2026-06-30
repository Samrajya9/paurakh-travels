import AddRegionButton from "./components/add-region-btn"
import RegionForm from "./components/create-region-form"

const page = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div></div>
        <AddRegionButton />
      </div>

      <RegionForm />
    </>
  )
}

export default page
