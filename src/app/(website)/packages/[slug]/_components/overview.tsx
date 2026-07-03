import PackageDetailSection from "./package_detail_section"

const rawHtmlString = `<h2 class=\"scroll-m-20 text-xl font-semibold tracking-tight text-foreground\">Trip Overview</h2>\n<p>The <strong class=\"font-bold\">Everest Base Camp Trek</strong> is one of the most iconic trekking routes in the world, taking you through Sherpa villages, ancient monasteries, and dramatic mountain scenery to the foot of the world's tallest peak.</p>\n<h3 class=\"scroll-m-20 text-lg font-semibold tracking-tight text-foreground\">Why Trek to Everest Base Camp?</h3>\n<ul class=\"list-disc pl-6\">\n<li class=\"my-0.5\">Walk beneath four of the world's six tallest peaks</li>\n<li class=\"my-0.5\">Experience authentic Sherpa culture in Namche Bazaar and Tengboche</li>\n<li class=\"my-0.5\">Stand at the base of <span class=\"underline\">Mount Everest</span> (8,849m)</li>\n</ul>\n<blockquote class=\"border-l-2 pl-2 [&>p]:before:content-['“'] [&>p]:after:content-['”']\"><p>This trek changed the way I see mountains — and myself.</p></blockquote>\n<h3 class=\"scroll-m-20 text-lg font-semibold tracking-tight text-foreground\">Trip Facts</h3>\n<table class=\"border-collapse border border-border w-full my-2\">\n<tr><th class=\"border border-border bg-muted font-semibold p-2 text-left\">Duration</th><td class=\"border border-border p-2 align-top\">14 Days</td></tr>\n<tr><th class=\"border border-border bg-muted font-semibold p-2 text-left\">Max Altitude</th><td class=\"border border-border p-2 align-top\">5,644m (Kala Patthar)</td></tr>\n<tr><th class=\"border border-border bg-muted font-semibold p-2 text-left\">Difficulty</th><td class=\"border border-border p-2 align-top\">Strenuous</td></tr>\n</table>`

const Overview = () => {
  return (
    <>
      <section className="border-b border-gray-100 py-8">
        <h2 className="mb-5 text-xl font-bold">ABCD</h2>

        <div
          dangerouslySetInnerHTML={{ __html: rawHtmlString }}
          className="space-y-4"
        />
      </section>
    </>
  )
}

export default Overview
