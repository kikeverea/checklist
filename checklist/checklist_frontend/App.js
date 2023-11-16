import React from 'react'
import { NativeRouter } from 'react-router-native'

import Main from './src/views/main/Main'

const App = () => {
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
    </>
  );
};

export default App;
