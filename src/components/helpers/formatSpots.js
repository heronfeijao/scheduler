import React from "react"

export const formatSpots = (spots) => {
  if (spots === 0) return <>no spots remaining</>
  if (spots === 1) return <>1 spot remaining</>
  if (spots > 1) return <>{spots} spots remaining</>
}