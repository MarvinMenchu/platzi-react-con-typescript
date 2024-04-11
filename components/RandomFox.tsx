import { useRef, useEffect, useState } from 'react'


type Props = {image: string, alt: string}

export const RandonFox = ({image, alt}: Props): JSX.Element => { // recomendado para usar
    const node = useRef<HTMLImageElement>(null)
    const [src, setSrc] = useState(
        '"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4='
    )

    useEffect(() => {
        // nuevo observador
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // onInteraction -> console.log
                if (entry.isIntersecting) {
                    setSrc(image)
                }
            })
        })

    //observe node
    if (node.current){
        observer.observe(node.current)
    }

    //desconectar
    return () => observer.disconnect()

    }, [image])
        
    

    

    


    return (<img ref={node} width={320} height="auto" className="rounded bg-gray-300" src={src} />)
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