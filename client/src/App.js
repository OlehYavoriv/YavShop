import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from './components/Headers/index';
import MainPage from './components/MainPages/index';
import "./styles/index.scss";
const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className="app">
          <Header/>
          <MainPage/>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
