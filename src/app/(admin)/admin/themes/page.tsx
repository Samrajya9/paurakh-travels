import { getAllThemes } from "@/services/theme.service"
import ThemeClientPage from "./components/theme-client-page"

export default async function Page() {
  const themes = await getAllThemes()

  return <ThemeClientPage initialThemes={themes} />
}
