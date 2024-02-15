import Classifier from './components/Classifier/Classifier';
import ImageList from './components/ImageList/ImageList';
import Navigation from './components/Navigation/Navigation';
import {Route, BrowserRouter, Routes} from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <Navigation />
        <Routes>
            <Route path='/' element={<Classifier />} />
            <Route path='list' element={<ImageList />} />
            <Route path='*' element={<Classifier />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
