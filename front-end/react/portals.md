public/index.html

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <div id="modal-root"></div>
  </body>
</html>
```

src/Modal.jsx

``` jsx
import React from 'react';
import reactDom from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return reactDom.createPortal(this.props.children, this.el);
  }
}
```

src/App.jsx

``` jsx
import './App.css';
import React, { useState } from 'react';
import reportWebVitals from './reportWebVitals';
import Modal from './Modal';

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      This div has overflow: hidden
      <button onClick={() => setShowModal(true)} type="button">Show Modal</button>
      {
        showModal && (
          <Modal>
            <div className="modal">
              <div>
                Debout, les Damnés de la terre.
              </div>
              <div>
                Debout, les forçats de la faim.
              </div>
              <button onClick={() => setShowModal(false)} type="button">Hide Modal</button>
            </div>
          </Modal>
        )
      }
    </div>
  );
}
```
src/index.js

``` jsx
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);
```
