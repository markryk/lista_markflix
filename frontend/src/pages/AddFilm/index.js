import { Component } from "react";
import api from '../../services/api';
import {FaHome} from 'react-icons/fa';
import {Link} from 'react-router-dom';

export default class CadastroFilme extends Component{

    state = {
        novoFilme: {
            titulo:'',
            duracao:'',
            sinopse:'', 
            ano:'', 
            classif:'', 
            nota:''
        },
        cad_titulo:'',
        cad_duracao:'',
        sinopse:'', 
        cad_ano:'', 
        cad_classif:'', 
        cad_nota:''
    };


    handleTituloChange = e =>{
      this.setState({cad_titulo: e.target.value});
    };

    handleDuracaoChange = e =>{
      this.setState({cad_duracao: e.target.value});
    };

    handleSinopseChange = e =>{
      this.setState({cad_sinopse: e.target.value});
    };

    handleAnoChange = e =>{
      this.setState({cad_ano: e.target.value});
    };

    handleClassifChange = e =>{
      this.setState({cad_classif: e.target.value});
    };

    handleNotaChange = e =>{
      this.setState({cad_nota: e.target.value});
    };

    handleOnSubmit = async e =>{
        e.preventDefault();
        
        const {cad_titulo, cad_duracao, cad_sinopse, cad_ano, cad_classif, cad_nota} = this.state;

        const Filme = {'titulo':cad_titulo, 'duracao':cad_duracao, 'sinopse':cad_sinopse, 'ano':cad_ano, 'classif':cad_classif, 'nota':cad_nota}

        await api.post(`/filme`, Filme)
        .then(console.log(Filme))

        alert('Filme adicionado com sucesso.');

    }

    render(){

        const {'titulo':cad_titulo, 'duracao':cad_duracao, 'sinopse':cad_sinopse, 'ano':cad_ano, 'classif':cad_classif, 'nota':cad_nota} = this.state;

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
                    <input required="required" type="text" placeholder=""
                    value={cad_titulo} onChange={this.handleTituloChange}/>
                  </p>

                  <p> 
                    <label> Duração (em minutos) </label>
                    <input required="required" type="text" placeholder=""
                    value={cad_duracao} onChange={this.handleDuracaoChange}/> 
                  </p>

                  <p>
                    <label> Sinopse </label>
                    <input type="text" placeholder=""
                    value={cad_sinopse} onChange={this.handleSinopseChange}/>
                  </p>

                  <p>
                    <label> Ano </label>
                    <input required="required" type="text" placeholder=""
                    value={cad_ano} onChange={this.handleAnoChange}/>
                  </p>

                  <p>
                    <label> Classificação indicativa </label>
                    <input required="required" type="text" placeholder=""
                    value={cad_classif} onChange={this.handleClassifChange}/>
                  </p>

                  <p>
                    <label> Nota </label>
                    <input required="required" type="text" placeholder=""
                    value={cad_nota} onChange={this.handleNotaChange}/>
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