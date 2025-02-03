import React from 'react';
import RomanNumeralConverter from './components/romanNumeralConverter';
import { Provider, defaultTheme, Flex } from '@adobe/react-spectrum';

function App() {
  return (
    <Provider theme={defaultTheme} height='100vh' width='100vw'>
      <Flex alignItems='center' justifyContent='center' height='100vh'>
        <RomanNumeralConverter></RomanNumeralConverter>
      </Flex>
    </Provider>
  );
}

export default App;
