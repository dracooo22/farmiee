import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/Login';
import Nearby from './screens/Nearby';
import Profile from './screens/Profile';
import Signup from './screens/Signup';
import Recommendation from './screens/Recommendation';
import "bootstrap/dist/css/bootstrap.min.css";  
import "bootstrap/dist/js/bootstrap.bundle.min"; 
import Weather from './screens/Forecasting';
// Adjust path as needed

// Store data can be moved to a separate file if preferred
const stores = [
  {
    id: 1,
    name: 'Downtown Store',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    latitude: 40.7128,
    longitude: -74.0060,
    phone: '(212) 555-1234',
    hours: 'Mon-Fri: 9am-9pm, Sat-Sun: 10am-6pm',
    distance: 0.5
  },
  // Add more stores...
];

function App() {
  return (
    <Router>
      <div> 
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/about" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>

          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/createuser" element={<Signup/>}/>
          <Route exact path="/recommendation" element={<Recommendation/>}/>
          <Route exact path="/weather" element={<Weather/>}/>
          {/* Add new route for Store Locator */}
          <Route 
            path="/nearby-store" 
            element={<Nearby apiKey="AIzaSyDNL7TjRCN8K2WJsxFN0_AYHUAyitzAfzo" stores={stores} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;