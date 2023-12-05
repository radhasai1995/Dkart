import { DetailedHTMLProps, ImgHTMLAttributes, useEffect, useState } from "react";
import * as Styles from "./styles";
import * as GlobalFixture from "@globalFixture";
const ImageWithPlaceholder = ({
    src,
    placeholderSrc,
    onLoadComplete,
    ...props
}: {
    onLoadComplete?: () => void
    placeholderSrc?: string
} & DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
>) => {
    const [imgSrc, setImgSrc] = useState(
        placeholderSrc || src,
    )
    const onFailLoadingImage = (e: any) => {
        e.target.src = GlobalFixture.MEDIA_FIXTURE_CONTENTS.EMPTY_IMAGE;
        e.onerror = null;
    }
    useEffect(() => {
        if (!src) return
        const img = new Image()
        img.src = src
        img.onload = function () {
            setImgSrc(src)
            if (onLoadComplete) {
                onLoadComplete()
            }
        }
    }, [src, onLoadComplete])
    return <Styles.StyledProductImg width={250} src={imgSrc} {...props} onError={onFailLoadingImage} />
}
export { ImageWithPlaceholder };
export default ImageWithPlaceholder;