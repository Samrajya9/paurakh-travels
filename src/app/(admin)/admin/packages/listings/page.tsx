import CreatePackageButton from "../components/create-package-button"
import PackageTable from "../components/package-table"

const page = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Packages</h1>
          <p className="text-sm text-muted-foreground">
            Manage trekking and travel packages.
          </p>
        </div>
        <CreatePackageButton />
      </div>

      <PackageTable />
    </div>
  )
}

export default page
