import DestinationSelect from "../destinations/components/destination-select"
import CreatePackageButton from "./components/create-package-button"

const page = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div></div>
        <CreatePackageButton />
      </div>
    </>
  )
}

export default page
