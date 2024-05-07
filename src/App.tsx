import { useState, useEffect } from 'react'
import './App.css'

const useImageURL = () => {
  const [imageURL, setImageURL] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Se realizan ambas solicitudes de imágenes utilizando Promise.all
        const [response1, response2] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/photos/1", { mode: "cors" }),
          fetch("https://jsonplaceholder.typicode.com/photos/2", { mode: "cors" })
        ]);

        // Se verifica si alguna de las solicitudes ha fallado
        if (response1.status >= 400 || response2.status >= 400) {
          throw new Error("Server error!!");
        }

        // Se obtienen los datos de las respuestas
        const data1 = await response1.json();
        const data2 = await response2.json();

        // Se actualiza el estado con la URL de la primera imagen
        setImageURL(data1.url);
        // Se indica que la carga ha finalizado
        setLoading(false);

        // Se simula un cambio de imagen después de un tiempo
        setTimeout(() => {
          // Se actualiza el estado con la URL de la segunda imagen
          setImageURL(data2.url);
        }, 2000);
      } catch (error) {
        // En caso de error, se maneja y se actualiza el estado 
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { imageURL, error, loading };
};

function App() {
  const { imageURL, error, loading } = useImageURL();

  if (loading) return <p>Loading...</p>
  if (error) return <p>A network error was encountered!</p>

  return (
    imageURL && (
      <>
        <h1>An image</h1>
        <img src={imageURL} alt={"placeholder text"} />
      </>
    )
  )
}

export default App;
