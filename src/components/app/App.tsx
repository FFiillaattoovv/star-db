import {Header} from "../header/Header";
import {RandomPlanet} from "../random-planet/RandomPlanet";
import {Component, ErrorInfo} from "react";
import "./App.css"
import {ErrorIndicator} from "../error-indicator/ErrorIndicator";
import {PeoplePage} from "../people-page/PeoplePage";

export class App extends Component<{}, AppStateType> {

    state = {
        showRandomPlanet: true,
        hasError: false
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({hasError: true})
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        })
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null

        return (
            <div className="stardb-app">
                <Header/>
                {planet}
                <div className="row mb2 button-row">
                    <button className="toggle-planet btn btn-warning btn-lg" onClick={this.toggleRandomPlanet}>
                        Toggle Random Planet
                    </button>
                </div>
                <PeoplePage/>
            </div>
        )
    }
}

// types
type AppStateType = {
    showRandomPlanet: boolean
    hasError: boolean
}