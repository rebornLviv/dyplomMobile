import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"
function BiologyIocn(props) {
    return (
        <Svg
            width={122}
            height={63}
            viewBox="0 0 122 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            {...props}
        >
            <Path fill="url(#prefix__pattern0)" d="M0 .077h122v62.489H0z" />
            <Defs>
                <Pattern
                    id="prefix__pattern0"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <Use xlinkHref="#prefix__image0" transform="scale(.00024 .00048)" />
                </Pattern>
                <Image
                    id="prefix__image0"
                    width={4096}
                    height={2098}
                />
            </Defs>
        </Svg>
    )
}
export default BiologyIocn