import { 
    createBrowserRouter, 
    createRoutesFromElements, 
    RouterProvider,
    Route
 } from 'react-router-dom';

import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import ProductDetailPage from './pages/ProductDetail';
import ErrorPage from './pages/Error';

// TWO WAYS TO DEFINE ROUTES, THE ONE I'LL GO WITH IS THE OBJECT BASED APPROACH
// const routeDefinitions = createRoutesFromElements(
//     <Route>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/products" element={<ProductsPage />} />
//     </Route>
// )
// const router = createBrowserRouter(routeDefinitions);

const router = createBrowserRouter([
    {
     path: '/',
		 element: <RootLayout />,
		 errorElement: <ErrorPage />,
        children: [
         //index: true is default index route vs path: ''
		 	{ index: true, element: <HomePage /> },
            { path: '/products', element: <ProductsPage /> },
            { path: '/products/:productId', element:<ProductDetailPage/> }
		 ] 
    },
])

function App() {

    return <RouterProvider router={router} />;
}

export default App;
  