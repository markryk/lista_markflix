import { Component } from "react";
import {IconContext} from 'react-icons';
import {FaTrash, FaEdit, FaPlus} from 'react-icons/fa';
import {Link, Route} from 'react-router-dom';
import api from '../../services/api';
//import styled from 'styled-components';

/*const body = styled.body`
    background-color: red;
`;*/


export default class Home extends Component{

    state = {
        registros:[],
    };

    componentDidMount = async () =>{

        const response = await api.get(`/filmes`); 
        
        response.data.map(res=>{
            const {registros} = this.state;
            
            this.setState({
                registros :[...registros, res],     
            });    
        })

        console.log(this.state.registros);

    }

    deleteFilme = async (id) =>{


        console.log(id);

        await api.delete(`/filme/${id}`); 
        
        alert('Filme deletado com sucesso.');

    }
    
    render(){

        const {registros} = this.state;
        
            return(
                <div className="content">
                <div id="cadastro">
                <h1> Markflix </h1>
                <h2> Lista dos melhores filmes já assistidos </h2>
                <table>
                    <thead>
                        <tr>
                        <th>Id</th>    
                        <th>Título</th>
                        <th>Duração</th>
                        <th>Editar/Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                    {registros.map(registro=>(
                            <tr key={registro.id}>
                            <td data-label="Id" >{registro.id}</td>
                            <td data-label="Titulo" >{registro.titulo}</td>
                            <td data-label="Duracao" >{registro.duracao}</td>

                            <td>                                
                                <Link to={`/edit/${encodeURIComponent(registro.id)}`}>
                                    <button id='edit'>
                                        <IconContext.Provider value={{ color: "black", className: "global-class-name" }}>
                                            <div>
                                                <FaEdit/>
                                            </div>
                                        </IconContext.Provider>
                                    </button>
                                </Link>

                                <button id='delete' onClick={()=>this.deleteFilme(registro.id)}>
                                    <IconContext.Provider value={{ color: "black", className: "global-class-name" }}>
                                        <div>
                                            <FaTrash/>
                                        </div>
                                    </IconContext.Provider>
                                </button>
                            </td>
                            </tr>
                        ))}
                </tbody>
                </table>

                <p>
                    <Link to='/add'><button id='external_btn'> <FaPlus/> Cadastrar novo filme </button></Link>
                </p>
                <h3 id='markryk'> by <Link to={{pathname: 'https://github.com/markryk'}} target='_blank'> MarkRyk </Link></h3>
        
            </div>
            </div>
        );
    }
}