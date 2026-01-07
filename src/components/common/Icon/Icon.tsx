import type { Icon as PhosphorIcon, IconProps as PhosphorIconProps } from '@phosphor-icons/react'
import './Icon.css'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface IconProps extends Omit<PhosphorIconProps, 'size'> {
    /** Phosphor icon component */
    icon: PhosphorIcon
    /** Size variant */
    size?: IconSize
    /** Additional class name */
    className?: string
}

const sizeMap: Record<IconSize, number> = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
}

/**
 * Icon wrapper component for Phosphor Icons
 * Provides consistent sizing and styling across the app
 */
export function Icon({
    icon: IconComponent,
    size = 'md',
    className = '',
    weight = 'regular',
    ...props
}: IconProps) {
    return (
        <span className={`icon icon--${size} ${className}`.trim()}>
            <IconComponent
                size={sizeMap[size]}
                weight={weight}
                {...props}
            />
        </span>
    )
}

export default Icon
