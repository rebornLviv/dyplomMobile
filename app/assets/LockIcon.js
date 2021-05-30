import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LockIcon(props) {
  return (
    <Svg
      width={16}
      height={20}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8 11a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm5-4V5A5 5 0 003 5v2a3 3 0 00-3 3v7a3 3 0 003 3h10a3 3 0 003-3v-7a3 3 0 00-3-3zM5 5a3 3 0 116 0v2H5V5zm9 12a1 1 0 01-1 1H3a1 1 0 01-1-1v-7a1 1 0 011-1h10a1 1 0 011 1v7z"
        fill="#191744"
      />
    </Svg>
  )
}

export default LockIcon
