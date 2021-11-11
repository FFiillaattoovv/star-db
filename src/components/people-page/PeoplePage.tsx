import {PersonDetails} from "../pearson-details/PersonDetails";
import {ItemList} from "../item-list/ItemList";
import {Component, ErrorInfo} from "react";
import {ErrorIndicator} from "../error-indicator/ErrorIndicator";

export class PeoplePage extends Component<{}, PeoplePageStateType> {

    state = {
        selectedPerson: null,
        hasError: false
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({hasError: true})
    }

    onItemSelected = (id: string) => {
        this.setState({
            selectedPerson: id
        })
    }


    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        return (
            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList onItemSelected={this.onItemSelected}/>
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={this.state.selectedPerson}/>
                </div>
            </div>
        )
    }
}

// types
type PeoplePageStateType = {
    selectedPerson: string | null
    hasError: boolean
}