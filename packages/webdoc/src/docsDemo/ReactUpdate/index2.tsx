import React from 'react';

import Counter from './component/Counter';

function ReactUpdateDemo() {
  return (
    <div style={{textAlign:"center",position:"relative"}}>
      <Counter />
      <footer>
        <p>这是最外层组件的内容</p>
      </footer>
    </div>
  );
}

export default ReactUpdateDemo;