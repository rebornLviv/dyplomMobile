import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CameraIcon(props) {
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
                d="M9.589 4a1 1 0 00-.832.445l-1.35 2.026h-2.76A2.647 2.647 0 002 9.118v9.06a2.647 2.647 0 002.647 2.646h14.824a2.647 2.647 0 002.648-2.647v-9.06a2.647 2.647 0 00-2.648-2.646h-2.759l-1.35-2.026A1 1 0 0014.53 4H9.589zm-.816 4.025L10.123 6h3.872l1.35 2.025a1 1 0 00.832.446h3.294a.647.647 0 01.648.647v9.06a.647.647 0 01-.648.646H4.647A.647.647 0 014 18.177v-9.06a.647.647 0 01.647-.646h3.294a1 1 0 00.832-.446zm.992 5.21a2.294 2.294 0 114.589 0 2.294 2.294 0 01-4.589 0zm2.294-4.294a4.294 4.294 0 100 8.589 4.294 4.294 0 000-8.589z"
                fill="#fff"
            />
        </Svg>
    )
}

export default CameraIcon
