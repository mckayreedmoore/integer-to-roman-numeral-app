import React, { useState } from 'react';
import { Heading, NumberField, Button, View, Text } from '@adobe/react-spectrum';

const RomanNumeralConverter: React.FC = () => {
  const [number, setNumber] = useState<number | undefined>();
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateNumber = (value: number | undefined): boolean => {
    if (value === undefined || isNaN(value)) {
      setError('Please enter a valid number.');
      return false;
    }
    if (value < 1 || value > 3999) {
      setError('Number must be between 1 and 3999.');
      return false;
    }
    setError(null);
    return true;
  };

  const getRomanNumeral = async () => {
    if (!validateNumber(number)) {
      setResult(null);
      return;
    }

    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/romannumeral?query=${number}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch Roman numeral conversion.');
      }
      const data = await response.json();
      setResult(data.output);
    } catch (err) {
      setError('Something went wrong while fetching the conversion.');
    }
  };

  return (
    <View
      maxWidth='400px'
      padding='size-200'
      borderWidth='thin'
      borderColor='dark'
      borderRadius='medium'
      backgroundColor='gray-100'
    >
      <Heading level={2} marginBottom='size-400'>
        Roman numeral converter
      </Heading>
      <NumberField
        label='Enter a number'
        value={number}
        onChange={(value) => {
          setNumber(value);
          validateNumber(value);
        }}
        hideStepper
        width='100%'
      />
      {error && (
        <Text>
          <span style={{ color: 'red' }}>{error}</span>
        </Text>
      )}
      <Button variant='secondary' onPress={getRomanNumeral} marginTop='size-300' width='100%'>
        <Text>Convert to Roman numeral</Text>
      </Button>
      <View marginTop='size-200'>
        <Text>
          <strong>Roman numeral: {result}</strong>
        </Text>
      </View>
    </View>
  );
};

export default RomanNumeralConverter;
