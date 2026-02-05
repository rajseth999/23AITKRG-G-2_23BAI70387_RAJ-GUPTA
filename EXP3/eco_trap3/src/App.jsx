import Header from './components/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Logs from './pages/Logs';
import Login from './pages/Login';
import Dashboard_layout from './pages/Dashboard_layout';
import DashboardAnalytics from './pages/DashboardAnalytics';
import DashboardSummary from './pages/DashboardSummary';
import AuthProtectedRoutes from './Routes/AuthProtectedRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* <Logs/> */}

      <Routes>
        <Route path='/login' element={<Login />}/>
        
        <Route path='/' element={
          <AuthProtectedRoutes>
            <Dashboard_layout />
          </AuthProtectedRoutes> } 
        >
          <Route index element={<DashboardSummary />}/>
          <Route path = "summary" element={<DashboardSummary />}/>
          <Route path='analytics' element={<DashboardAnalytics />}/>
        </Route>
        
        <Route path='/logs' element={
          <AuthProtectedRoutes>
            <Logs/>
          </AuthProtectedRoutes>
        } />

      </Routes>

    </BrowserRouter>
  )
}


