import { getAllSeasons } from "@/services/season.service"
import SeasonClientPage from "./components/season-client-page"

export default async function Page() {
  const seasons = await getAllSeasons()

  return <SeasonClientPage initialSeasons={seasons} />
}
