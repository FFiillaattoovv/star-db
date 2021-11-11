import "./ItemList.css"
import {Component} from "react";
import {SwapiService, TransformPersonType} from "../../services/swapiService";
import {Spinner} from "../spinner/Spinner";

export class ItemList extends Component<ItemListPropsType> {

    swapiService = new SwapiService()

    state = {
        peopleList: null
    }

    componentDidMount() {
        this.swapiService.getAllPeople()
            .then((peopleList) => this.setState({
                peopleList: peopleList
            }))
    }

    renderItems = (arr: TransformPersonType[]) => {
        return arr.map(({name, id}) => {
            return (
                <li className="list-group-item" key={id} onClick={() => this.props.onItemSelected(id)}>
                    {name}
                </li>
            )
        })
    }

    render() {

        const {peopleList} = this.state

        if (!peopleList) {
            return <Spinner/>
        }

        const items = this.renderItems(peopleList)

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        )
    }
}

// types
type ItemListPropsType = {
    onItemSelected: (id: string) => void
}