import { useState, useEffect } from "react";
import CardList from "./components/card-list/card-list.component.jsx";
import "./App.css";
import SearchBox from "./components/search-box/search-box.component.jsx";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resp) => resp.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField)
    );
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (e) => {
    const searchFieldString = e.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder="Search Monsters"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};
// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchFild: "",
//     };
//   }

//   componentDidMount() {
// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((resp) => resp.json())
//   .then((users) =>
//     this.setState(() => {
//       return { monsters: users };
//     })
//   );
//   }

//   onSearchChange = (e) => {
//     const searchFild = e.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchFild };
//     });
//   };

//   render() {
//     const { monsters, searchFild } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonster = monsters.filter((monster) =>
//       monster.name.toLowerCase().includes(searchFild)
//     );
//     return (
//       <div className="App">
//         <h1 className="app-title">Monsters Rolodex</h1>
//         <SearchBox
//           className="monsters-search-box"
//           onChangeHandler={onSearchChange}
//           placeholder="Search Monsters"
//         />
//         <CardList monsters={filteredMonster} />
//       </div>
//     );
//   }
// }

export default App;
