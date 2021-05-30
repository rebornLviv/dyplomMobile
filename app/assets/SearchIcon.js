import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SearchIcon(props) {
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
                d="M17.61 16.298l-.282.35.32.317 3.706 3.676a.5.5 0 01-.001.69.499.499 0 01-.708-.003l-.001-.001-3.68-3.68-.317-.317-.35.28a8.5 8.5 0 111.313-1.312zm-10.777.938a7.5 7.5 0 108.334-12.472 7.5 7.5 0 00-8.334 12.472z"
                fill="#191744"
                stroke="#191744"
            />
        </Svg>
    )
}

export default SearchIcon
