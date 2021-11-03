import {SwapiService} from "./swapiService";

const swapi = new SwapiService()

swapi.getAllPeople()
    .then((people) => {
        people.forEach(person => console.log(person.name))
    })

swapi.getPerson('2')
    .then((person) => {
        console.log(person)
    })

