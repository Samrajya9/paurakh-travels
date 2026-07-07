import Image from "next/image"

const OverflowCard = () => {
  return (
    // 1. The outer wrapper defines the total frame size (including the pop-out space)
    <div className="relative flex h-[400px] w-[320px] items-end">
      {/* 2. The background container (only takes up the bottom 70% of the space) */}
      <div className="absolute inset-x-0 bottom-0 h-[50%] rounded-2xl border" />

      {/* 3. The Image sits perfectly on the bottom and naturally overflows past the 70% height */}
      <div className="pointer-events-none relative h-full w-full overflow-y-clip">
        <Image
          src="/images/temple.png"
          alt="temple"
          fill
          className="translate-y-9 object-contain object-bottom"
          priority
        />
      </div>
    </div>
  )
}

export default OverflowCard
