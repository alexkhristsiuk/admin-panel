export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesOnDelete = (id) => {
    return {
        type: 'HEROES_ONDELETE',
        payload: {id}
    }
}

export const heroesAdd = (hero) => {
    return {
        type: 'HEROES_ADD',
        payload: hero
    }
}

export const filteredHeroes = (heroes) => {
    /* console.log(heroes); */
    return {
        type: 'HEROES_FILTERED',
        payload: heroes
    }
}