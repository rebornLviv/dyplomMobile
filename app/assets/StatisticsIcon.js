import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Statistics(props) {
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
                d="M5 21.5h.5v-7h-3v7H5zm16 0h.5v-11h-3v11H21zm-8 0h.5v-19h-3v19H13zm-11-8h4a.5.5 0 01.5.5v8a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5v-8a.5.5 0 01.5-.5zm16-4h4a.5.5 0 01.5.5v12a.5.5 0 01-.5.5h-4a.5.5 0 01-.5-.5V10a.5.5 0 01.5-.5zm-8-8h4a.5.5 0 01.5.5v20a.5.5 0 01-.5.5h-4a.5.5 0 01-.5-.5V2a.5.5 0 01.5-.5z"
                fill={props.color}
                stroke={props.color}
            />
        </Svg>
    )
}

export default Statistics
