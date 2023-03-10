import './App.css';
import { Box } from './components/Box/Box';
import { useState, useRef, useEffect } from 'react'

function App() {
  const containerRef = useRef(null);

  const [boxes, setBoxes] = useState([])
  const [images, setImages] = useState([])
  const addBox = () => {
    boxes.push(images[boxes.length])
    setBoxes([...boxes])
  }
  const getImages = async () => {
    await fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((images) => { setImages([...images]); });
  }

  useEffect(() => {
    getImages()
  }, []);

  const deleteItem = (position) => {
    boxes.splice(position, 1)
    setBoxes([...boxes])
  }
  return (
    <div className="App">
      <main>
        <div className='col'>
          <button type="button" className="btn btn-primary btnAdd" onClick={() => addBox()}>Agregar Caja</button>
          <div ref={containerRef} className="container">
            {boxes.map((item, index) =>
              <Box index={index} containerRef={containerRef} backGround={item?.thumbnailUrl} key={`box-${index}`} />
            )}
          </div>
          <div className='contentTable'>
            <div className='col'>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {boxes.map((item, index) =>
                    <tr key={`${item.id}-row`}>
                      <td>{item.id}</td>
                      <td>
                        <img src={item.thumbnailUrl} alt={item.id} className='image-table' />
                      </td>
                      <td>
                        <button className="btn btn-link" onClick={() => deleteItem(index)}>Eliminar</button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table >
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

export default App;
