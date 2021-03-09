import React, {useState, useEffect} from 'react'
import PokemonList from'./PokemonList';
import axios from'axios';
import PaginationApp from'./Pagination';

export default function Pass() {
const [pokemon,setPokemon]=useState([]);
const [currentPageUrl, setCurrentPageUrl] 
= useState("https://pokeapi.co/api/v2/pokemon")

const [nextPageUrl, setNextPageUrl] = useState()
const [prevPageUrl, setPrevPageUrl] = useState()
const [loading, setLoading] = useState(true)


useEffect(()=>{
    setLoading(true)
    let cancel
    
    axios.get(currentPageUrl,{cancelToken: new axios.CancelToken(c => cancel=c)
    }).then(res =>{
        setLoading(false)
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
        setPokemon(res.data.results.map(p => p.name))
    })
    return ()=> cancel()
    
}, [currentPageUrl])
//.catch(res => console.log("error"))  

let gotoNextPage = () =>  setCurrentPageUrl(nextPageUrl)
 //function gotoNextPage(){setCurrentPageUrl(nextPageUrl)}  
 function gotoPrevPage(){setCurrentPageUrl(prevPageUrl)}  

   if(loading) return "Loading..."
    return (
        <div>
            Pokemon List Pass App:
            <PokemonList pokemonA={pokemon} />
            <PaginationApp gotoNextPage={nextPageUrl ? gotoNextPage : null}
            gotoPrevPage={prevPageUrl ? gotoPrevPage: null }/>
        </div>
    )
}
