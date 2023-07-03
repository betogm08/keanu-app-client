import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getKeanuImageFetch, getKeanuImageFailure } from './features/keanu/keanuSlice';
import { KeanuImageResponse, KeanuReducer, Payload, Error } from './types';
import './App.css';

function App() {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [option, setOption] = useState('');
  const [image, setImage] = useState('');

  const keanuImage: KeanuImageResponse = useSelector((state: KeanuReducer) => state.keanu.keanuImage);
  const error: Error = useSelector((state: KeanuReducer) => state.keanu.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (keanuImage?.data?.getKeanuImage) {
      dispatch(getKeanuImageFailure({}));
      setImage(keanuImage?.data?.getKeanuImage);
    }
  }, [keanuImage]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (width === null || width === undefined || Number.isNaN(width)) {
      dispatch(getKeanuImageFailure({message: 'Width is required', code: 'BAD_USER_INPUT'}));
      return;
    }

    if ((width < 100 || width > 1000)) {
      dispatch(getKeanuImageFailure({message: 'Width must be in the range from 100 to 1000', code: 'BAD_USER_INPUT'}));
      return;
    }

    if ((height < 100 || height > 1000)) {
      dispatch(getKeanuImageFailure({message: 'Height must be in the range from 100 to 1000', code: 'BAD_USER_INPUT'}));
      return;
    }

    const imageOptions: Payload = {
      width,
      height,
      option
    };

    dispatch(getKeanuImageFetch(imageOptions));
  }

  return (
    <div className="App">
      <h1>Keanu API</h1>
      <p className='instructions'>Configure the filters to get your Keanu image with required options. <strong>NOTE: </strong>width and height values must be in a range between 100 - 1000</p>
      { error && <p className='errorMessage'>{error.message}</p> }
      <form onSubmit={handleSubmit}>
        <label htmlFor="width">Width</label>
        <input 
          name='width' 
          type="number" 
          value={width} 
          placeholder='Enter a width...'
          onChange={e => setWidth(Number(e.target.value))}
          required 
        />

        <label htmlFor="height">Height</label>
        <input 
          name='height' 
          type="number" 
          value={height} 
          placeholder='Enter a height...'
          onChange={e => setHeight(Number(e.target.value))} 
        />

        <label htmlFor="option">Option</label>
        <select name='option' onChange={e => setOption(e.target.value)}>
          <option value="y">Young Keanu</option>
          <option value="g">Grayscale</option>
        </select>

        <div className='submitBox'>
          <input type="submit" value="Submit" />
        </div>
      </form>

      { image && 
        <div className='image' dangerouslySetInnerHTML={{ __html: image }} />
      }
    </div>
  );
}

export default App;

