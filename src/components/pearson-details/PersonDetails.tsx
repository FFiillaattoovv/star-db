import "./PearsonDetails.css"
import {Component} from "react";
import {SwapiService, TransformPersonType} from "../../services/swapiService";

export class PersonDetails extends Component<PersonDetailsPropsType, PersonDetailsStateType> {

    swapiService = new SwapiService()

    state = {
        person: null
    }

    componentDidMount() {
        this.updatePerson()
    }

    componentDidUpdate(prevProps: Readonly<PersonDetailsPropsType>) {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson()
        }
    }

    updatePerson = () => {
        const {personId} = this.props
        if (!personId) {
            return
        }

        this.swapiService.getPerson(personId)
            .then((person) => this.setState({
                person: person
            }))
    }

    render() {

        if (!this.state.person) {
            return <span>Select a person from a list</span>
        }

        const {person: {id, name, gender, birthYear, eyeColor}} = this.state

        return (
            <div className="person-details card">
                <img className="person-image"
                     src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt=""/>

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{birthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{eyeColor}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

// types
type PersonDetailsPropsType = {
    personId: string | null
}
type PersonDetailsStateType = {
    person: TransformPersonType | null
}