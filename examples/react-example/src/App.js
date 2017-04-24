import { Component } from 'react';
import h from 'react-hyperscript';
import hh from 'hyperscript-helpers';
import { list, str, ifelse, when, map } from '../../../lib.js';
import { executor as e } from '../../../';
import logo from './logo.svg';
import './App.css';

const { div, p, span, ul, li, img, h2, input, strike } = hh(h);

// const ReactHyperPlugin = {
//   predicate: (f) => typeof f === 'string',
//   executor: (_exec, f, ...args) => (h(f, ...args)),
// };

// const e = (expr) => executor(expr);

function Greet({ name }) {
  return e(
    [p, '.App-intro', [
      [span, [str, 'Hello, ', [ifelse, name, name, 'world'], '!']]]]);
}

const itemStyle = {
  backgroundColor: 'rgba(200, 162, 200, 0.5)',
  margin: '1px',
  padding: '5px',
  cursor: 'pointer',
};
function Item({ text, onClick }) {
  return e(
    [li,
      { onClick: () => onClick(text), style: itemStyle },
      text]);
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      toggle: false,
      phrases: ['curry', 'partial application', 'monads and burritos', 'neeerrrrd'],
    };
    this.updateName = this.updateName.bind(this);
    this.updateToggle = this.updateToggle.bind(this);
  }
  updateName(name) {
    this.setState({ name });
  }
  updateToggle() {
    this.setState(({ toggle }) => ({ toggle: !toggle }));
  }
  render() {
    return e(
      [div, '.App', [
        [div, '.App-header', [
          [img, '.App-logo', { src: logo }],
          [h2, [list, 'Welcome to ', [strike, 'React'], ' Lilac']]]],
        [Greet, { name: this.state.name }],
        [p, [
          [input,
            { type: 'text',
              placeholder: "world",
              onChange: (event) => this.updateName(event.target.value),
              value: this.state.name,
              style: { fontSize: 'large', textAlign: 'center' } }]]],
        [p, [list,
          'Toggled: ', [str, this.state.toggle],
          [input, { type: 'checkbox', onClick: this.updateToggle }]]],
        [when, this.state.toggle,
          [p, [list, 
            [span, 'I was hidden!'],
            ' ',
            [span, ["...but now I'm not!"]]]]],
        [ul,
          { style: { listStyleType: 'none', padding: 0 } },
          [map, text => Item({ text, onClick: this.updateName}),
            [list, ...this.state.phrases]]]]]);
  }
}

export default App;
