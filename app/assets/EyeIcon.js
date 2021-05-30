import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EyeIcon(props) {
  return (
    <Svg
      width={22}
      height={16}
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20.92 7.6C18.9 2.91 15.1 0 11 0S3.1 2.91 1.08 7.6a1 1 0 000 .8C3.1 13.09 6.9 16 11 16s7.9-2.91 9.92-7.6a1 1 0 000-.8zM11 14c-3.17 0-6.17-2.29-7.9-6C4.83 4.29 7.83 2 11 2s6.17 2.29 7.9 6c-1.73 3.71-4.73 6-7.9 6zm0-10a4 4 0 100 8 4 4 0 000-8zm0 6a2 2 0 110-4 2 2 0 010 4z"
        fill="#567BF3"
      />
    </Svg>
  )
}

export default EyeIcon
