/* 
    description: Tato stranka slouzi jako uvodni
    autor: David Michalica
*/

import 'react-notifications/lib/notifications.css';
import { Routes, Route } from 'react-router-dom';
import PublicPageLayout from './Components/PageLayout';
import RequireAuth from './Components/RequireAuth';
import { privateRoutes, publicRoutes } from "./Constants/pagesStructure";
import { NotificationContainer } from 'react-notifications';
import NotFoundPage from './Pages/404';
//import 'semantic-ui-css/semantic.min.css'

function App()
{

  const publicRoutesComponents = GetListOfRouteComponent(publicRoutes);
  const privateRoutesComponents = GetListOfRouteComponent(privateRoutes);

  return (
    <>
        <Routes>
        { /* PUBLIC ROUTE */}
        {publicRoutesComponents}

        { /* PRIVATE ROUTE */}
          <Route element={<RequireAuth />} > {/* tento element vyžaduje přítomný token v paměti */}
              <Route element={<PublicPageLayout />} > {/* všechny stránky uvnitř mají stejný layout (topnav + footer) */}
                {privateRoutesComponents}
              </Route>
          </Route>
          <Route path='/*' element={<NotFoundPage />}/>
      </Routes>
      <NotificationContainer />
    </>
  ); 
}

// funcion create list of routes components
function GetListOfRouteComponent(routesList)
{ 
  const list = routesList.map(
    ({path, component, children, key}) =>
    children?.lenght < 0 ?
    <Route exact path={path} element={component} key={key} /> :
    (
      <Route exact path={path} key={key}>
        <Route index element={component} />
        {GetListOfRouteComponent(children)}
      </Route>
    )
  );
  return list;
}

export default App;
