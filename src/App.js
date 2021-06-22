import 'react-dropdown/style.css';
import logo from './logo.svg';
import './App.css';
import React from 'react';
import Ubigeo, { District, Region, Province } from "ubigeos";
import departamentos from '/cosas/departamentos'
import provincias from '/cosas/provincias'
import distritos from '/cosas/distritos'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      rnombre: '',
      rid: '',
      pid: '',
      pnombre: '',
      did: '',
      dnombre: ''
    });
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    console.log(event)
    event.preventDefault();
    alert(`ID de region/departamento ${this.state.rid} nombre de la region/departamento ${this.state.rnombre}`);
    alert(`ID de la provincia ${this.state.pid} nombre de la provincia ${this.state.pnombre}`);
    alert(`ID del distrito ${this.state.did} nombre del distrito ${this.state.dnombre}`)
  }



  handleChange = event => {
    this.setState({ rid: event.target.value });
    let a = Region.instance(`${event.target.value}`).getName();
    this.setState({ rnombre: JSON.stringify(a) });
  };

  handleChange2 = event => {
    this.setState({ pid: event.target.value });
    let a = Province.instance(`${event.target.value}`).getName();
    this.setState({ pnombre: JSON.stringify(a) });
  };

  handleChange3 = event => {
    this.setState({ did: event.target.value });
    let a = District.instance(`${event.target.value}`).getName();
    this.setState({ dnombre: JSON.stringify(a) });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div>
            <form onSubmit={this.handleSubmit}>
              <br />
              <select value={this.state.value} key={this.state.key} onChange={this.handleChange}>
                <option defaultValue >
                  Elige un departamento
                </option>
                {departamentos.map((i, key) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
              <select value={this.state.value} key={this.state.key} onChange={this.handleChange2}>
                <option defaultValue>
                  Elige una provincia
                </option>
                {
                  provincias.map((pi, key) =>
                    (pi.department_id === this.state.rid) ? (
                      <option key={pi.id} value={pi.id} >
                        {pi.name}
                      </option>)
                      : (<></>)
                  )
                }
              </select>
              <select value={this.state.value} key={this.state.key} onChange={this.handleChange3}>
                <option defaultValue>
                  Elige un distrito
                </option>
                {
                  distritos.map((di, key) =>
                    (di.department_id === this.state.rid)?(
                    (di.province_id === this.state.pid) ? (
                      <option key={di.id} value={di.id} >
                        {di.name}
                      </option>)
                      : (<></>)
                  ):(<></>))
                }
              </select>
              <input type="submit" value="Elegir"></input>
            </form>
          </div>
        </header>
      </div>
    );

  }
}



export default App;
