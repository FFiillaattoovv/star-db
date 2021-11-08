import "./RandomPlanet.css"
import {Component} from "react";
import {SwapiService, TransformPlanetType} from "../../services/swapiService";

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
        diameter: null
    }

    onPlanetLoaded = (planet: TransformPlanetType) => {
        this.setState({...planet})
    }

    updatePlanet() {
        const id = String(Math.floor(Math.random() * 25) + 2)

        this.swapiService.getPlanet(id)
            .then(this.onPlanetLoaded)
    }

    render() {

        const {id, name, population, rotationPeriod, diameter} = this.state

        return (
            <div className="random-planet jumbotron rounded">
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
            </div>
        )
    }
}

// types
type RandomPlanetStateType = {
    id:  null | string,
    name: null | string,
    population: null | string,
    rotationPeriod: null | string,
    diameter: null | string
}