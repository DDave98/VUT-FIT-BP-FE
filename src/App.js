/* 
    description: Tato stranka slouzi jako uvodni
    autor: David Michalica
*/

import { Routes, Route } from 'react-router-dom';
import RequireAuth from './Components/RequireAuth';
import { privateRoutes, publicRoutes } from "./Constants/pagesRoute";
import NotFoundPage from './Pages/404';

function App()
{

  const publicRoutesComponents = GetListOfRouteComponent(publicRoutes);
  const privateRoutesComponents = GetListOfRouteComponent(privateRoutes);

  return (
    <Routes>
      { /* PUBLIC ROUTE */}
      {publicRoutesComponents}

      { /* PRIVATE ROUTE */}
        <Route element={<RequireAuth />} >
          {privateRoutesComponents}
        </Route>
        <Route path='/*' element={<NotFoundPage />}/>
    </Routes>
  ); 
}

// funcion create list of routes components
function GetListOfRouteComponent(routesList, topKey)
{ 
  return routesList.map(
    ({path, component, children}, key) =>
    children.lenght < 0 ?
    <Route exact path={path} element={component} key={topKey+"."+key} /> :
    (
      <Route exact path={path} element={component} key={topKey+"."+key}>
        {GetListOfRouteComponent(children, topKey)}
      </Route>
    )
  );
}

export default App;
