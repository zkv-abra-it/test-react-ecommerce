import React, { useMemo, useState } from 'react'
import { getCountries } from '@services/ApiService';
import Loading from '@components/Loading/Loading';
import { getContriesWithRegion } from '@utils/Normalize';

export default function CountrySelector(props) {
    const [countriesList, setCountriesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useMemo(() => {
        setIsLoading(true);

        getCountries({ 'filter[id]': 'US,IL', 'include': 'regions' })
            .then(({ data }) => {
                const countriesList = getContriesWithRegion({countries: data.data, regions: data.included})
                setCountriesList(countriesList);

                
                props.setFormData((prev) => ({ ...prev, country: countriesList[0]?.id, region: countriesList[0].regions[0]?.id }))

            }).finally(() =>
                setIsLoading(false)
            )
    }, []);

    if (isLoading) return <Loading></Loading>

    return (
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                    Country
                </label>
                <div className="mt-2">
                    <select
                        id="country"
                        onChange={(e) => props.handleChange(e)}
                        value={props.country}
                        name="country"
                        autoComplete="country-name"
                        required
                        className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-zinc-600"
                    >
                        {countriesList.map((item) => (<option value={item.id}>{item.name}</option>))}
                    </select>
                </div>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                    Region
                </label>
                <div className="mt-2">
                    <select
                        id="region"
                        onChange={(e) => props.handleChange(e)}
                        value={props.region}
                        name="region"
                        autoComplete="region-name"
                        required
                        className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-zinc-600"
                    >
                        {countriesList.find(el => el.id === props.country)?.regions?.map((item) => (<option value={item.id}>{item.name}</option>))}
                    </select>
                </div>
            </div>
        </div>
    )
}