import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ExamResult from './ExamResult';
import NotFound from './NotFound';
import CanditateList from './CanditatesList';

const App = () => {
  // const router =
  //   createBrowserRouter(
  //     // use "/" as start for absolute path and "" for relative path to the route, i.e : "/transvision/new-request" is an absolute path where as enter-entiy-details is relative to "/transvision/new-request"
  //     createRoutesFromElements(
  //       <>
  //         {/* <Route path="/" element={<Home />} /> */}
  //         <Route path="/" element={<Home />} />
  //       </>))
  // <div className='App' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
  //   {/* <ExamResult /> */}
  //   <Home />
  // </div>
  // <Routes>
  //   <Route path="/" element={<Home />} />
  //   <Route path="/examResult" element={<ExamResult />} />
  // </Routes>

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Home />
  //   },
  // ]);

  // return <RouterProvider router={router} />

  return (<Router>
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/examResult" element={<ExamResult />} />
      <Route path="/canditateList" element={<CanditateList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>)
};

export default App;