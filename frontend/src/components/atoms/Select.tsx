import React, { useEffect, useState } from 'react';
import RoundedIcon from './RoundedIcon';
import down from '../../assets/icons/down.svg'

interface SelectProps {
    caption: string
    options?: string[]
    selected?: string
    setSelected: React.Dispatch<React.SetStateAction<string>>
    isLoading?: boolean
}

const Select: React.FC<SelectProps> = ({ caption, options, selected, setSelected, isLoading }) => {

    /** State to show options */
    const [showOptions, setShowOptions] = useState(false)

    /** State to show the caption, name to display on non selected option*/
    const [captionLabel, setCaptionLabel] = useState(caption)

    /**
     * Effect to update selected value
     */
    useEffect(() => {
        if (selected)
            setSelected(selected)
    }, [selected])


    /**
     * Effect to update caption label
     */
    useEffect(() => {
        if (selected)
            setCaptionLabel(selected as string)
        else
            setCaptionLabel(caption)
    }, [selected])

    /**
     * Handle options visibility
     */
    const handleOptions = () => {
        setShowOptions(!showOptions)
    }

    /**
     * Handle selected option
     * 
     * @param e event to get the selected option
     */
    const handleSelected = (e: React.FormEvent) => {
        setSelected(e.currentTarget.textContent as string)
        setShowOptions(false)
    }

    return (
        <div className='w-auto relative'>

            <div className='min-w-4 min-h-12 border-2 border-base flex z-50 bg-gray-shade-200
                rounded-lg hover:ring-2 ring-base cursor-pointer
                justify-center items-center relative' onClick={handleOptions}>

                {isLoading && <p className='min-w-20 h-4 bg-gray-400 animate-pulse'></p>}
                {!isLoading && <p>{captionLabel}</p>}

                {!isLoading && <RoundedIcon src={down} alt='Arrow Down' className='w-6 p-[0.3rem] bg-base fill-white absolute right-4' fix='translate-y-[0.1rem]' />}
            </div>

            <div className={`w-full min-h-12  border-2 rounded-b-lg -translate-y-2 z-10 pt-4 absolute bg-gray-shade-200
                transition-all duration-150 ease-in-out
                ${showOptions ? `opacity-100 visible scale-100` : `opacity-0 scale-95`}`}>

                <div className='max-h-24 overflow-auto es-scrollbar'>
                    {options?.length === 0 &&
                        <div className='py-2 hover:bg-base hover:text-gray-shade-400 text-center'>No options available</div>
                    }
                    {options?.map((option, index) => (
                        <div key={index} className='py-2 hover:bg-base hover:text-gray-shade-400 text-center' onClick={handleSelected}>{option}</div>
                    ))}
                </div>

            </div>

        </div>
    );
};

export default Select;