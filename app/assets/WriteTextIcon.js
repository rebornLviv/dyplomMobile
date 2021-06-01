import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"

function WriteHandIcon(props) {
    return (
        <Svg
            width={20}
            height={21}
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            {...props}
        >
            <Path d="M0 20.4h20V.4H0v20z" fill="url(#prefix__pattern0)" />
            <Defs>
                <Pattern
                    id="prefix__pattern0"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <Use xlinkHref="#prefix__image0" transform="scale(.01563)" />
                </Pattern>
                <Image
                    id="prefix__image0"
                    width={64}
                    height={64}
                    xlinkHref="data:image/png;base64,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"
                />
            </Defs>
        </Svg>
    )
}

export default WriteHandIcon
