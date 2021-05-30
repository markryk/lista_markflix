import { Component } from "react";
import api from '../../services/api';
import {FaHome} from 'react-icons/fa';
import {Link} from 'react-router-dom';

export default class CadastroFilme extends Component{

    state = {
        novoFilme: {
            titulo:'',
            duracao:'',
        },
        cad_titulo:'',
        cad_duracao:'',
    };


    handleTituloChange = e =>{
      this.setState({cad_titulo: e.target.value});
    };

    handleDuracaoChange = e =>{
      this.setState({cad_duracao: e.target.value});
    };

    handleOnSubmit = async e =>{
        e.preventDefault();
        
        const {cad_titulo, cad_duracao} = this.state;

        const Filme = {'titulo':cad_titulo, 'duracao':cad_duracao}

        await api.post(`/filme`, Filme)
        .then(console.log(Filme))

        alert('Filme adicionado com sucesso.');

    }

    render(){

        const {cad_titulo, cad_duracao} = this.state;

        return(
          <div className="container" > 
            <div className="content">         
              <div id="cadastro">
                <form onSubmit={this.handleOnSubmit}>
                  <h1> Markflix </h1>

                  <h2> Inserir filme </h2>
                  <br></br>
                    
                  <p> 
                    <label> Título </label>
                    <input required="required" type="text" placeholder="Digite o título"
                          value={cad_titulo} onChange={this.handleTituloChange}/>
                  </p>

                  <p> 
                    <label> Duração </label>
                    <input required="required" type="text" placeholder="Digite a duração" value={cad_duracao} onChange={this.handleDuracaoChange}/> 
                  </p>

                  <p> 
                    <input type="submit" value="Cadastrar"/> 
                  </p>
                </form>
                <p>
                  <Link to='/'><button> <FaHome/> Voltar para início </button></Link>
                </p>
                <h3> by <Link to={{pathname: 'https://github.com/markryk'}} target='_blank'> MarkRyk </Link></h3>
              </div>
            </div>
          </div>
        )
    }
}