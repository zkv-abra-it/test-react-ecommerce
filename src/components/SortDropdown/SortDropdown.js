import React from 'react'

const SORTERS_MAP = {
    'id': 'Relevance',
    'createdAt': 'Newest'
};

export default function SortDropdown ({ currentSort, handleChangeSort }) {
    const [open, setOpen] = React.useState(false);
    const [currentSortLabel, setCurrentSortLabel] = React.useState(SORTERS_MAP[currentSort]);

    const handleClick = (field, label) => {
        if (field === currentSort) return;

        setOpen(false);
        setCurrentSortLabel(label);

        handleChangeSort(field)
    }

    return (
        <div className="relative inline-block text-left">
            <div className='flex items-center'>
                <span className='w-full pr-3'>Sorted by:</span>

                <button onClick={() => setOpen(!open)} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    {currentSortLabel}
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            { open &&
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div className="py-1" role="none">
                        <button onClick={() => handleClick('id', 'Relevance')} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Relevance</button>
                        <button onClick={() => handleClick('createdAt', 'Newest')} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Newest</button>
                    </div>
                </div>
            }
        </div>

    )
}