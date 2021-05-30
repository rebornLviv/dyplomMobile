import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Colors from "../constants/Colors"

function FriendsIcon(props) {
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
        d="M23 21v-2a4 4 0 00-3-3.87M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M16 3.13a4 4 0 010 7.75M9 11a4 4 0 100-8 4 4 0 000 8z"
        stroke={props?.focused ? Colors.main : Colors.dGrey}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default FriendsIcon
