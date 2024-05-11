interface IconProps {
    className?: string
    src: string
    alt: string
    fix?: string
}

const RoundedIcon: React.FC<IconProps> = ({ src, alt, className, fix }) => {

    return (
        <div className={`aspect-square rounded-full ${className}`}>
            <img src={src} alt={alt} className={`${fix}`}/>
        </div>
    )
}

export default RoundedIcon