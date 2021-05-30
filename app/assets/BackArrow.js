import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackArrowIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.77 3.316a1 1 0 111.46 1.368L5.308 11H21a1 1 0 110 2H5.308l5.921 6.316a1 1 0 11-1.458 1.368l-7.5-8a1 1 0 010-1.368l7.5-8z"
        fill="#191744"
      />
    </Svg>
  )
}

export default BackArrowIcon
