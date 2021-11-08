import {Header} from "../header/Header";
import {ItemList} from "../item-list/ItemList";
import {RandomPlanet} from "../random-planet/RandomPlanet";
import {PearsonDetails} from "../pearson-details/PearsonDetails";
import "./App.css"

export const App = () => {
    return (
        <div  className="stardb-app">
            <Header/>
            <RandomPlanet/>
            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList/>
                </div>
                <div className="col-md-6">
                    <PearsonDetails/>
                </div>
            </div>
        </div>
    )
}