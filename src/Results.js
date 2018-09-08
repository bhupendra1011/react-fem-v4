//Pet component
import React from "react";
import Pet from "./Pet";
import { Consumer } from "./SearchContext";
import pf from "petfinder-client";
import SearchBox from "./SearchBox";

//creating petfinder client
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.SECRET
});

// converting functinal component to a class component
class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    this.search();
  }

  search = () => {
    // api call always in component did mount
    petfinder.pet
      .find({
        output: "full",
        location: this.props.searchParams.cityState,
        animal: this.props.searchParams.animal,
        breed: this.props.searchParams.breed
      })
      .then(data => {
        let pets;
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }
        this.setState({ pets: pets });
      });
  };

  render() {
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
          let breed;
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              key={pet.id}
              id={pet.id}
              name={pet.name}
              animal={pet.animal}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city} , ${pet.contact.state}`}
            />
          );
        })}
      </div>
    );
    /*     
    return React.createElement("div", { id: "container" }, [
      React.createElement(
        "h1",
        { style: { color: "blue" }, onClick: this.handleTitleClick },
        "Adopt Pet !"
      ),
      React.createElement(Pet, { name: "Luna", animal: "Dog", breed: "pug" }),
      React.createElement(Pet, { name: "Tuna", animal: "Dog", breed: "chug" }),
      React.createElement(Pet, { name: "Puna", animal: "Dog", breed: "tick" })
    ]); */
  }
}
/*
const App = () => {
return React.createElement("div", { id: "container" }, [
React.createElement("h1", { style: { color: "blue" } }, "Adopt Pet !"),
React.createElement(Pet, { name: "Luna", animal: "Dog", breed: "pug" }),
React.createElement(Pet, { name: "Tuna", animal: "Dog", breed: "chug" }),
React.createElement(Pet, { name: "Puna", animal: "Dog", breed: "tick" })
]);
};
*/

export default function ResultsWithContext(props) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  );
}
