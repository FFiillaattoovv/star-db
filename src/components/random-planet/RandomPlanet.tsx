import "./RandomPlanet.css"
import {Component, FC} from "react";
import {SwapiService, TransformPlanetType} from "../../services/swapiService";
import {Spinner} from "../spinner/Spinner";

export class RandomPlanet extends Component<{}, RandomPlanetStateType> {

    constructor() {
        super({});
        this.updatePlanet()
    }

    swapiService = new SwapiService()

    state = {
        id: null,
        name: null,
        population: null,
        rotationPeriod: null,
        diameter: null,
        loading: true
    }

    onPlanetLoaded = (planet: TransformPlanetType) => {
        this.setState({...planet, loading: false})
    }

    updatePlanet() {
        const id = String(Math.floor(Math.random() * 25) + 2)

        this.swapiService.getPlanet(id)
            .then(this.onPlanetLoaded)
    }

    render() {

        const {id, name, population, rotationPeriod, diameter, loading} = this.state

        const spinner = loading ? <Spinner/> : null
        const content = !loading ? <PlanetView id={id} name={name} population={population} rotationPeriod={rotationPeriod}
                        diameter={diameter}/> : null

        return (
            <div className="random-planet jumbotron rounded">
                {spinner}
                {content}
            </div>
        )
    }
}

const PlanetView: FC<PlanetViewPropsType> = ({id, name, population, rotationPeriod, diameter}) => {
    return (
        <>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt=""/>
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

// types
type RandomPlanetStateType = {
    id: null | string
    name: null | string
    population: null | string
    rotationPeriod: null | string
    diameter: null | string
    loading: boolean
}
type PlanetViewPropsType = {
    id: null | string
    name: null | string
    population: null | string
    rotationPeriod: null | string
    diameter: null | string
}