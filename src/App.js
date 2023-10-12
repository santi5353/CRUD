import {BrowserRouter,Route, Routes} from 'react-router-dom';
import ShowsProducts from './components/ShowsProducts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowsProducts/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
