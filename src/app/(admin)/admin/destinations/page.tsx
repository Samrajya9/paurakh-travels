import { getAllDestinations } from "@/services/destination.service"
import DestinationClientPage from "./components/destination-client-page"

export default async function Page() {
  const destinations = await getAllDestinations()

  return <DestinationClientPage initialDestinations={destinations} />
}
