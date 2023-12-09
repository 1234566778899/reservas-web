import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomeApp } from './components/HomeApp';
import { AdminApp } from './components/AdminApp';
import { ListcubiculosApp } from './components/ListcubiculosApp';
import { ScheduleApp } from './components/ScheduleApp';
import { ReservaApp } from './components/ReservaApp';
import { HorarioApp } from './components/HorarioApp';
import { LoginApp } from './components/LoginApp';
import { ConfirmacionApp } from './components/ConfirmacionApp';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<HomeApp />} />
        <Route exact path='/login' element={<LoginApp/>} />
        <Route exact path='/confirmacion' element={<ConfirmacionApp/>} />
        <Route exact path='/home' element={<HomeApp />} />
        <Route path='/admin/*' element={<AdminApp />}>
          <Route path='' element={<ListcubiculosApp />} />
          <Route path='cubiculos' element={<ListcubiculosApp />} />
          <Route path='turnos/:id' element={<ScheduleApp />} />
          <Route path='reservas' element={<ReservaApp />} />
          <Route path='horario' element={<HorarioApp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
