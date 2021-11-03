export class SwapiService {

    _baseURL = 'https://swapi.dev/api'

    async getResource(url: string) {
        const res = await fetch(`${this._baseURL}${url}`)
        if (!res.ok) {
            throw new Error(`Could not fetch ${this._baseURL}${url}, received ${res.status}`)
        }
        return await res.json()
    }


    async getAllPeople(): Promise<Array<PersonType>> {
        const res: GetAllPeopleResponseType = await this.getResource(`/people/`)
        return res.results
    }

    async getPerson(id: string): Promise<PersonType> {
        let res: GetPersonResponseType;
        res = await this.getResource(`/people/${id}/`);
        return res
    }

    async getAllPlanets(): Promise<Array<PlanetType>> {
        const res: GetAllPlanetsResponseType = await this.getResource(`/planets/`)
        return res.results
    }

    async getPlanet(id: string): Promise<PlanetType> {
        let res: GetPlanetResponseType;
        res = await this.getResource(`/planets/${id}/`);
        return res
    }

    async getAllStarships(): Promise<Array<StarshipType>> {
        const res: GetAllStarshipsResponseType = await this.getResource(`/starships/`)
        return res.results
    }

    async getStarship(id: string): Promise<StarshipType> {
        let res: GetStarshipResponseType;
        res = await this.getResource(`/starships/${id}/`);
        return res
    }
}

//types
type PersonType = {
    birth_year: string
    eye_color: string
    films: Array<string>
    gender: string
    hair_color: string
    height: string
    homeworld: string
    mass: string
    name: string
    skin_color: string
    created: string
    edited: string
    species: Array<string>
    starships: Array<string>
    url: string
    vehicles: Array<string>
}
type GetAllPeopleResponseType = {
    count: number
    next: string | null
    previous: string | null
    results: Array<PersonType>
}
type GetPersonResponseType = PersonType

type PlanetType = {
    name: string
    rotation_period: string
    orbital_period: string
    diameter: string
    climate: string
    gravity: string
    terrain: string
    surface_water: string
    population: string
    residents: Array<string>
    films: Array<string>
    created: string
    edited: string
    url: string
}
type GetAllPlanetsResponseType = {
    count: number
    next: string | null
    previous: string | null
    results: Array<PlanetType>
}
type GetPlanetResponseType = PlanetType

type StarshipType = {
    name: string
    model: string
    manufacturer: string
    cost_in_credits: string
    length: string
    max_atmosphering_speed: string
    crew: string
    passengers: string
    cargo_capacity: string
    consumables: string
    hyperdrive_rating: string
    MGLT: string
    starship_class: string
    pilots: Array<string>
    films: Array<string>
    created: string
    edited: string
    url: string
}
type GetAllStarshipsResponseType = {
    count: number
    next: string | null
    previous: string | null
    results: Array<StarshipType>
}
type GetStarshipResponseType = StarshipType



