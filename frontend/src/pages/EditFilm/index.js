import { Component } from "react";
import api from '../../services/api';

export default class EditFilm extends Component{
    
    state = {
      id:this.props.match.params.id,
      cad_titulo:'',
      cad_duracao:'',
    };

    componentDidMount = async e =>{
   
      const response = await api.get(`/filme/${this.state.id}`)
      
      this.setState({
        cad_titulo:response.data.titulo,
        cad_duracao:response.data.duracao,
      });
    
      console.log(response);

    }

    handleTituloChange = e =>{
      this.setState({cad_titulo: e.target.value});
    };

    handleDuracaoChange = e =>{
      this.setState({cad_duracao: e.target.value});
    };

    handleOnSubmit = async e =>{
      const {id, cad_titulo, cad_duracao} = this.state;  
        e.preventDefault();

        const Filme = {'id': id, 'titulo':cad_titulo, 'duracao':cad_duracao}

        await api.put(`/filme`, Filme)
        .then(console.log(Filme))

        alert('Filme alterado com sucesso.');

    }

    render(){

      const {id, cad_titulo, cad_duracao} = this.state;

      return(

          <div className="container" > 
            <div className="content">         
              <div id="cadastro">
                <form onSubmit={this.handleOnSubmit}> 
                  <h1> Editar filme </h1> 
                  
                  <p> 
                    <label >Id</label>
                    <input type="number" value={id} readOnly/>
                  </p>

                  <p> 
                    <label > Título </label>
                    <input required="required" type="text" placeholder=""
                        value={cad_titulo} onChange={this.handleTituloChange}/>
                  </p>

                  <p> 
                    <label> Duração </label>
                    <input required="required" type="text" placeholder=""
                        value={cad_duracao} onChange={this.handleDuracaoChange}/> 
                  </p>

                  <p> 
                    <input type="submit" value="Alterar"/> 
                  </p>
                </form>
              </div>
            </div>
        </div>
      )
  }
}