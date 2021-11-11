export class SwapiService {

    _baseURL = 'https://swapi.dev/api'

    async getResource(url: string) {
        const res = await fetch(`${this._baseURL}${url}`)
        if (!res.ok) {
            throw new Error(`Could not fetch ${this._baseURL}${url}, received ${res.status}`)
        }
        return await res.json()
    }


    async getAllPeople(): Promise<Array<TransformPersonType>> {
        let people: GetAllPeopleResponseType
        people = await this.getResource(`/people/`)
        return people.results.map(this._transformPerson).slice(0, 5)
    }

    async getPerson(id: string): Promise<TransformPersonType> {
        let pearson: GetPersonResponseType
        pearson = await this.getResource(`/people/${id}/`)
        return this._transformPerson(pearson)
    }

    async getAllPlanets(): Promise<Array<PlanetType>> {
        const res: GetAllPlanetsResponseType = await this.getResource(`/planets/`)
        return res.results
    }

    async getPlanet(id: string): Promise<TransformPlanetType> {
        let planet: GetPlanetResponseType;
        planet = await this.getResource(`/planets/${id}/`);
        return this._transformPlanet(planet)
    }

    async getAllStarships(): Promise<Array<StarshipType>> {
        const res: GetAllStarshipsResponseType = await this.getResource(`/starships/`)
        return res.results
    }

    async getStarship(id: string): Promise<TransformStarshipType> {
        let starship: GetStarshipResponseType;
        starship = await this.getResource(`/starships/${id}/`);
        return this._transformStarship(starship)
    }

    _extractId(item: string) {
        const idRegExp = /\/([0-9]*)\/$/
        return item.match(idRegExp)![1]
    }

    _transformPerson = (pearson: PersonType): TransformPersonType => {
        return {
            id: this._extractId(pearson.url),
            name: pearson.name,
            gender: pearson.gender,
            birthYear: pearson.birth_year,
            eyeColor: pearson.eye_color
        }
    }

    _transformPlanet = (planet: PlanetType): TransformPlanetType => {
        return {
            id: this._extractId(planet.url),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }

    _transformStarship = (starship: StarshipType): TransformStarshipType => {
        return {
            id: this._extractId(starship.url),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.cost_in_credits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargo_capacity
        }
    }

}

//types
export type PersonType = {
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
export type TransformPersonType = {
    id: string
    name: string
    gender: string
    birthYear: string
    eyeColor: string
}

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
export type TransformPlanetType = {
    id: string
    name: string
    population: string
    rotationPeriod: string
    diameter: string
}

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
type TransformStarshipType = {
    id: string
    name: string
    model: string
    manufacturer: string
    costInCredits: string
    length: string
    crew: string
    passengers: string
    cargoCapacity: string
}



