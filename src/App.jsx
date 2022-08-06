import { useEffect, useState } from 'react'

function App() {
  const { search, animals} = useAnimalSearch(); // grab from custom hook bellow

  return (
    <main>
      <h1>Animal Farm</h1>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => search(e.target.value)}
        
        />

      <ul>
        {animals.map((animal) => (
          <Animal key={animal.id} {...animal} /> // pull from UI component 
          ))}

        {animals.length === 0 && "No animals found"} 
      </ul>
    </main>
  )
}

//UI component 
function Animal({ type, name, age }) {
  return (
    <li>
      <strong>{type}</strong> {name} ({age} years old)
    </li>
  )
}

//custom hook 
function useAnimalSearch(){
  const [animals, setAnimals] = useState([]);
  // local storage save
  useEffect(()=> {
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery)
  }, []);
  // Pull from baby server 
  const search = async (q) => {
    const response = await fetch(
      "http://localhost:8080?" + new URLSearchParams({ q })
      );
      const data = await response.json(); // freak the data pulled from BackEnd 
      setAnimals(data)
      // save input into local storage 
      localStorage.setItem("lastQuery",q)
    };
    
  return {search, animals}
}


export default App
