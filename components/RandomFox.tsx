import { FC, FunctionComponent } from 'react';

export const RandonFox2 = () => {
    return <img />
}

//generar a random function  1 a 123

type Props = {image: string, alt: string}

export const RandonFox = ({image, alt}: Props): JSX.Element => { // recomendado para usar
    return <img width={320} height="auto" className="rounded" src={image} />
}

export const RandonFox3: FunctionComponent = () => {
    return <img />
}

export const RandonFox4: FC = () => {
    return <img />
}