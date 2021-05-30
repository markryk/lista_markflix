import { Component } from "react";
import api from '../../services/api';
import {FaHome} from 'react-icons/fa';
import {Link} from 'react-router-dom';

export default class EditFilm extends Component{
    
  state = {
    id:this.props.match.params.id,
    cad_titulo:'',
    cad_duracao:'',
    cad_sinopse:'', 
    cad_ano:'', 
    cad_classif:'', 
    cad_nota:''
  };

  componentDidMount = async e =>{
  
    const response = await api.get(`/filme/${this.state.id}`)
    
    this.setState({
      cad_titulo:response.data.titulo,
      cad_duracao:response.data.duracao,
      cad_sinopse:response.data.sinopse, 
      cad_ano:response.data.ano, 
      cad_classif:response.data.classif, 
      cad_nota:response.data.nota 
    });
  
    console.log(response);

  }

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
    const {id, cad_titulo, cad_duracao, cad_sinopse, cad_ano, cad_classif, cad_nota} = this.state;  
      e.preventDefault();

      const Filme = {'id': id, 'titulo':cad_titulo, 'duracao':cad_duracao, 'sinopse':cad_sinopse, 'ano':cad_ano, 'classif':cad_classif, 'nota':cad_nota}

      await api.put(`/filme`, Filme)
      .then(console.log(Filme))

      alert('Filme alterado com sucesso.');

  }

  render(){
    const {id, cad_titulo, cad_duracao, cad_sinopse, cad_ano, cad_classif, cad_nota} = this.state;

    return(
      
        <div className="container" > 
          <div className="content">         
            <div id="cadastro">
              <form onSubmit={this.handleOnSubmit}> 
              <h1> Markflix </h1>

              <h2> Editar filme </h2>
              <br></br>
                
                <p> 
                  <label >Id</label>
                  <input type="number" value={id} readOnly/>
                </p>

                <p>
                  <label> Título </label>
                  <input required="required" type="text" placeholder=""
                  value={cad_titulo} onChange={this.handleTituloChange}/>
                </p>

                <p> 
                  <label> Duração </label>
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
                  <input type="submit" value="Alterar"/> 
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