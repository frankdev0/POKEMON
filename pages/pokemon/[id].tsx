import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Pokemon.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const inter = Inter({ subsets: ["latin"] });

interface pokemonProps {
  id: string;
  url: string;
  name: string;
  imageUrl:string;
  pokemon: {
    id: string;
    url: string;
    name: string;
  }

}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokemonDetails {
  name: string;
  id: number;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  sprites: any; 
  stats: {
    name: string;
    base_stat: number;
  }[];
}


export default function Pokemon() {

  const [selectedPokemon, setSelectedPokemon] = useState<pokemonProps[]>([]);
  const router = useRouter();
  const { id } = router.query;
  const [stats, setStats] = useState<PokemonStat[]>([]);
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [search, setSearch] = useState('');
  const [details, setDetails] = useState({
    name: "",
    id: "",
    height: "",
    weight: "",
    types: "",
    abilities: [],
    sprites: "",
    stats: ""
  })



const handleCloseModal = () => {
  setShowModal(false)
}


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/type/${id}/`);
            setSelectedPokemon(response?.data?.pokemon);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, [id]);

const handlePageClick = (event:any) => {
  const newOffset = event.selected * itemsPerPage % selectedPokemon.length;
  setCurrentPage(newOffset);
};


const filteredPokemon = selectedPokemon.filter((item) =>
item.pokemon.name.toLowerCase().includes(search.toLowerCase())
);

const currentItems = filteredPokemon.slice(currentPage, currentPage + itemsPerPage);

const handleViewClick = async(name: string) => { 
  setLoading(true)
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    console.log('first response', response)
    const details = {
      name: response?.data?.name,
      id: response?.data?.id,
      height: response?.data?.height,
      weight: response?.data?.weight,
      types: response.data.types.map((typeInfo: PokemonType) => typeInfo.type.name),
      abilities: response.data.abilities.map((abilityInfo: any) => abilityInfo.ability.name),
      sprites: response?.data?.sprites,
      stats: response.data.stats.map((statInfo: PokemonStat) => ({
        name: statInfo.stat.name,
        base_stat: statInfo.base_stat
      }))
    };
    setDetails(details)
    setStats(response?.data?.stats)
    setShowModal(true)
    setLoading(false)
} catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false)
}
};

 console.log('details', details)
 console.log('stats', stats)

  return (
    <>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
       <Navbar/>
       <div className="my-5">
       <div className={styles.pokemongrid}>

       
        <div className={`${styles.tablebody} row`}>
            <div className='col-12'>
            <div>
            <div className="d-flex justify-content-center">TYPES OF POKEMONS</div>
            
          <div className={styles.tableContainer}>
            <div className={styles.inputContainer}>
            <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        className={styles.searchfield}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(0); 
        }}
      />
            </div>
        
      {filteredPokemon.length > 0 ? (
        <table className={`${styles.customTable}`}>
      <thead>
        <tr>
          <th className={styles.tableheader}>ID.</th>
          <th className={styles.tableheader}>TITLE</th>
          <th className={styles.tableheader}>URL</th>
          <th className={styles.tableheader}>Action</th>
        </tr>
      </thead>
      <tbody>
                {currentItems && currentItems.map((item, index) => {
                  const { pokemon } = item;
                  const isEvenRow = index % 2 === 0;
                  const cellStyle = {
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  };

                  return (
                    <tr key={index} className={isEvenRow ? styles.evenrow : styles.oddrow}>
                      <td>{index + 1}</td>
                      <td style={cellStyle}>{pokemon.name}</td>
                      <td style={cellStyle}>{pokemon.url}</td>
                      <td>
                        <button className={styles.btnsubmit} onClick={() => handleViewClick(pokemon.name)}>View</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
    </table>
     ) : (
      <div>
        No search matches found.
      </div>
    )}
   
      <div className="d-flex justify-content-center my-5">
      <ReactPaginate
          breakLabel="..."
          nextLabel={null}
          previousLabel={null}
          onPageChange={handlePageClick}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(selectedPokemon.length / itemsPerPage)}
          containerClassName={styles.pagination}
          nextLinkClassName={styles['page-num'] + ' ' + styles['next-arrow']}
          previousLinkClassName={styles['page-num'] + ' ' + styles['previous-arrow']}
          pageLinkClassName={styles['page-num']}
          activeLinkClassName={styles.active}
        />
      </div>
     
    </div>
    </div>
    </div>
    </div>
    <Modal show={showModal} onHide={handleCloseModal} dialogClassName={styles.customModalWidth}>
          <Modal.Body className={styles.customModalBody}>
            <div>
            <div className="d-flex justify-content-end py-2" onClick={handleCloseModal}> <div className={styles.closeicon}>x</div></div>
            <div className={`${styles.customTableWrapper} d-flex justify-content-between align-items-center`}>
            
            <h6 className={styles.heading}>DETAILS</h6>
            
            </div>
                     <div className={styles.detailswrapper}>
                      <div className={styles.detailseven}>
                      <div className={styles.leftside}>
                      Name:
                      </div>
                      <div className={styles.rightside}>
                      {details?.name}
                      </div>
                      </div>
                      <div className={styles.detailsodd}>
                      <div className={styles.leftside}>
                      Id:
                      </div>
                      <div className={styles.rightside}>
                      {details?.id}
                      </div>
                      </div>
                      <div className={styles.detailseven}>
                      <div className={styles.leftside}>
                      height:
                      </div>
                      <div className={styles.rightside}>
                      {details?.height}
                      </div>
                      </div>
                      <div className={styles.detailsodd}>
                      <div className={styles.leftside}>
                      Weight:
                      </div>
                      <div className={styles.rightside}>
                      {details?.weight}
                      </div>
                      </div>
                      <div className={styles.detailseven}>
                      <div className={styles.leftside}>
                      Type:
                      </div>
                      <div className={styles.rightside}>
                      {details?.types[0]}
                      </div>
                      </div>
                      <div className={styles.detailsodds}>
                      <div className={styles.leftside}>
                      Abilities:
                      </div>
                      {/* <div className={`${styles.rightside} d-flex flex-column`}>
                      {details?.abilities?.map((a:string) => a)}
                      
                      </div> */}
                      <div className={`${styles.right} d-flex flex-column`}>
                        {details?.abilities?.map((ability, index) => (
                          <div key={index} className="my-1">{ability}</div>
                        ))}
                      </div>
                      </div>
                      </div>
                      </div>
                      <div>
            
           
            
            <div className='row'>
            <h6 className={styles.heading}>STATS</h6>
            <div className='col-12'>
          
          
          
           
           <table className={`${styles.customTables}`}>
      <thead>
        <tr>
          <th className={styles.tableheader}>ID.</th>
          <th className={styles.tableheader}>NAME</th>
          <th className={styles.tableheader}>URL</th>
          {/* <th className={styles.tableheader}>D</th> */}
          <th className={styles.tableheader}>BASE STAT</th>
          <th className={styles.tableheader}>EFFORT</th>
        </tr>
      </thead>
      <tbody>
                {stats && stats.map((item, index) => {
                  const { stat } = item;
                  const isEvenRow = index % 2 === 0;
                  const cellStyle = {
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  };

                  return (
                    <tr key={index} className={isEvenRow ? styles.evenrow : styles.oddrow}>
                      <td>{index + 1}</td>
                      <td style={cellStyle}>{stat.name}</td>
                      <td style={cellStyle}>{stat.url}</td>
                      <td style={cellStyle}>{item.base_stat}</td>
                      <td style={cellStyle}>{item.effort}</td>
                      
                    </tr>
                  );
                })}
              </tbody>
    </table>
           
          
           </div>
           </div>
           </div>
           
                    </Modal.Body>
                  <div className='d-flex justify-content-end px-5 py-3'>
         
                  <button onClick={handleCloseModal} 
                  type="submit"
                  disabled={loading}
                  className={`${styles.btnclose} d-flex justify-content-center align-items-center`}>
                    Close
                  </button>
                </div>
              </Modal>
    
    </div>
       </div>
       <Footer/>
      </main>
    </>
  );
}
