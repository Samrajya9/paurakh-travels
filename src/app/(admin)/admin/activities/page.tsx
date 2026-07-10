import { getAllActivities } from "@/services/activity.service"
import ActivityClientPage from "./components/activity-client-page"

export default async function Page() {
  const activities = await getAllActivities()

  return <ActivityClientPage initialActivities={activities} />
}
