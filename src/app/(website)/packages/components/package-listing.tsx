// // import PackageFilters from "./package-filters"
// // import PackageResults from "./package-results"

// // export default function PackageListing() {
// //   return (
// //     <>
// //       <div className="flex items-start gap-4">
// //         <PackageFilters />
// //         <PackageResults />
// //       </div>
// //     </>
// //   )
// // }
// import PackageFilters from "./package-filters"
// import PackageResults from "./package-results"

// import {
//   Drawer,
//   DrawerContent,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer"

// import { Button } from "@/components/ui/button"
// import { SlidersHorizontal } from "lucide-react"

// export default function PackageListing() {
//   return (
//     <>
//       {/* Mobile filter button */}
//       <div className="mb-4 lg:hidden">
//         <Drawer direction="right">
//           <DrawerTrigger asChild>
//             <Button variant="outline">
//               <SlidersHorizontal className="mr-2 h-4 w-4" />
//               Filters
//             </Button>
//           </DrawerTrigger>

//           <DrawerContent>
//             <DrawerHeader>
//               <DrawerTitle>Filters</DrawerTitle>
//             </DrawerHeader>

//             <PackageFilters className="max-w-full overflow-y-auto px-4 pb-6" />
//           </DrawerContent>
//         </Drawer>
//       </div>

//       <div className="flex items-start gap-4">
//         {/* Desktop sidebar */}
//         <PackageFilters className="hidden lg:block" />

//         <PackageResults />
//       </div>
//     </>
//   )
// }

import PackageFilters from "./package-filters"
import PackageResults from "./package-results"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"

export default function PackageListing() {
  return (
    <>
      {/* Mobile filter button */}
      <div className="mb-4 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-full max-w-md overflow-y-auto px-4"
          >
            <SheetHeader>
              <SheetTitle className="sr-only">Filters</SheetTitle>
            </SheetHeader>

            <div className="mt-0">
              <PackageFilters className="max-w-full" />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex items-start gap-4">
        {/* Desktop sidebar */}
        <PackageFilters className="hidden lg:block lg:w-70" />

        <PackageResults />
      </div>
    </>
  )
}
