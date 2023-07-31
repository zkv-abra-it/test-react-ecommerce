import React, { useEffect, useState } from 'react'
import { getCountriesWithRegions } from '@services/ApiService';

export default function OrderCountrySelector(props) {
    const [countriesList, setCountriesList] = useState([]);
    const [regionsList, setRegionsList] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        getCountriesWithRegions({ 'filter[id]': 'US,IL', 'include': 'regions' })
            .then(({ data }) => {
                const countries = data.data;
                const regions = data.included

                let countriesList = [];
                let regionsList = {};
                let setDefault = false;

                countries.forEach(itemCountry => {
                    countriesList = [...countriesList, {
                        id: itemCountry.id,
                        name: itemCountry.attributes.name
                    }];

                    let countryRegionIds = itemCountry.relationships.regions.data.map(({ id }) => id);
                    if (setDefault === false) {
                        props.setFormData((prev) => ({ ...prev, country: itemCountry.id, region: countryRegionIds[0] }))
                        setDefault = true;
                    }

                    regionsList[itemCountry.id] = regions
                        .filter((regionItem) => countryRegionIds.includes(regionItem.id))
                        .map((element) => ({
                            id: element.id,
                            name: element.attributes.name
                        }));
                });

                setCountriesList(countriesList);
                setRegionsList(regionsList);
            }).finally(() =>
                setIsLoading(false)
            )
    }, []);

    if (isLoading) return null

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
                        className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                        className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                        {regionsList[props.country]?.map((item) => (<option value={item.id}>{item.name}</option>))}
                    </select>
                </div>
            </div>
        </div>
    )
}