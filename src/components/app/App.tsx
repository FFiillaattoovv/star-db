import {Header} from "../header/Header";
import {ItemList} from "../item-list/ItemList";
import {RandomPlanet} from "../random-planet/RandomPlanet";
import {PersonDetails} from "../pearson-details/PersonDetails";
import {Component} from "react";
import "./App.css"

export class App extends Component<{}, AppStateType> {

    state = {
        showRandomPlanet: true,
        selectedPerson: null
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        })
    }

    onItemSelected = (id: string) => {
        this.setState({
            selectedPerson: id
        })
    }

    render() {

        const {selectedPerson} = this.state

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
                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList onItemSelected={this.onItemSelected}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={selectedPerson}/>
                    </div>
                </div>
            </div>
        )
    }
}

// types
type AppStateType = {
    showRandomPlanet: boolean
    selectedPerson: null | string
}