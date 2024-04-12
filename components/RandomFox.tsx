import { useRef, useEffect, useState } from 'react'
import type { ImgHTMLAttributes } from 'react'


type LazyImageProps = {src: string, alt: string, onLazyLoad?: (node : HTMLImageElement) => void}
type ImageNative = ImgHTMLAttributes<HTMLImageElement>
type Props = LazyImageProps & ImageNative

export const LazyImage = ({src, alt, onLazyLoad, ...imgProps}: Props): JSX.Element => { // recomendado para usar
    const node = useRef<HTMLImageElement>(null)
    const [isLazyLoad, setIsLazyLoad] = useState(false)
    const [currentSrc, setCurrentSrc] = useState(
        '"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4='
    )

    useEffect(() => {
        if (isLazyLoad) {
            return
        }
        // nuevo observador
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting || !node.current) {
                    return
                }
                setCurrentSrc(src)
                observer.disconnect()
                setIsLazyLoad(true)

                if (typeof onLazyLoad === 'function') {
                    onLazyLoad(node.current)
                }

                // onInteraction -> console.log
                // if (entry.isIntersecting) {
                //     setCurrentSrc(src)
                //     onLazyLoad && onLazyLoad(entry.target as HTMLImageElement)
                //     observer.unobserve(entry.target)
                // }
            })
        })

    //observe node
    if (node.current){
        observer.observe(node.current)
    }

    //desconectar
    return () => observer.disconnect()

    }, [src, onLazyLoad, isLazyLoad])

    return (
    <img 
        ref={node} 
        src={currentSrc}
        alt={alt} 
        {...imgProps}
    />)
}






// export const RandonFox2 = () => {
//     return <img />
// }

// export const RandonFox3: FunctionComponent = () => {
//     return <img />
// }

// export const RandonFox4: FC = () => {
//     return <img />
// }