import { ApiContext } from '@context/ApiContext/ApiContext'
import React, { Component, useContext } from 'react'


export const getProducts = async (token, params) => {
    const searchParams = new URLSearchParams(params);
      
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/products?' + searchParams.toString(), {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/vnd.api+json',
            'X-Include': 'noHateoas;totalCount'
        }
    });

    return await response.json();
}

export const getImages = async (id, token, params) => {
    const searchParams = new URLSearchParams(params);

    const response = await fetch(process.env.REACT_APP_API_URL + '/api/products/' + id + '/images?' + searchParams.toString(), {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/vnd.api+json',
            'X-Include': 'noHateoas;totalCount'
        }
    });

    return await response.json();
}




