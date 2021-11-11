import "./RandomPlanet.css"
import {Component, FC} from "react";
import {SwapiService, TransformPlanetType} from "../../services/swapiService";
import {Spinner} from "../spinner/Spinner";
import {ErrorIndicator} from "../error-indicator/ErrorIndicator";

export class RandomPlanet extends Component<{}, RandomPlanetStateType> {

    swapiService = new SwapiService()

    state = {
        id: null,
        name: null,
        population: null,
        rotationPeriod: null,
        diameter: null,
        loading: true,
        error: false,
    }

    private interval: NodeJS.Timeout | undefined;

    componentDidMount() {
        this.updatePlanet()
        this.interval = setInterval(this.updatePlanet, 5000)
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval)
        }
    }

    onPlanetLoaded = (planet: TransformPlanetType) => {
        this.setState({...planet, loading: false, error: false})
    }

    onError = () => {
        this.setState({error: true, loading: false})
    }

    updatePlanet = () => {
        const id = String(Math.floor(Math.random() * 25) + 3)

        this.swapiService.getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError)
    }

    render() {

        const {id, name, population, rotationPeriod, diameter, loading, error} = this.state

        const spinner = loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorIndicator/> : null
        const hasData = !(loading || error)

        const content = hasData ?
            <PlanetView id={id} name={name} population={population} rotationPeriod={rotationPeriod}
                        diameter={diameter}/> : null

        return (
            <div className="random-planet jumbotron rounded">
                {spinner}
                {errorMessage}
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
    error: boolean
}
type PlanetViewPropsType = {
    id: null | string
    name: null | string
    population: null | string
    rotationPeriod: null | string
    diameter: null | string
}