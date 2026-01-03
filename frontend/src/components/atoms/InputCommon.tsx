import React from 'react'

interface InputCommonProps {
    label: string
    id: string
    name: string
    value: string | number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    required?: boolean
    placeholder?: string
    className?: string
    inputClassName?: string
    min?: number
    max?: number
    step?: number
    autoComplete?: string
    inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
}

const InputCommon: React.FC<InputCommonProps> = ({
    label,
    id,
    name,
    value,
    onChange,
    type = 'text',
    required,
    placeholder,
    className,
    inputClassName,
    min,
    max,
    step,
    autoComplete,
    inputMode,
}) => {
    return (
        <div className={`group ${className ?? ''}`}>
            <label htmlFor={id} className='block text-gray-100 font-light mb-1 group-hover:text-base'>
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-3 py-1 border border-base bg-gray-shade-100 rounded-full focus:outline-none ring-base focus:ring focus:ring-2 hover:ring-1 ${inputClassName ?? ''}`}
                required={required}
                min={min}
                max={max}
                step={step}
                autoComplete={autoComplete}
                inputMode={inputMode}
            />
        </div>
    )
}

export default InputCommon;