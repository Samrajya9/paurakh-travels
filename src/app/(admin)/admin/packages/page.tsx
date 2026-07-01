import CreatePackageButton from "./components/create-package-button"

const page = () => {
  const rawHtmlString = `<h1 class=\"text-4xl font-bold text-red-600\">Heading</h1><p></p>`
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div></div>
        <CreatePackageButton />
      </div>

      <div className="border">
        <div dangerouslySetInnerHTML={{ __html: rawHtmlString }} />
      </div>
    </>
  )
}

export default page
