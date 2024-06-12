import { Outlet, useNavigation } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

function RootLayout() {
    const navigation = useNavigation();

    return (
        <>
            <MainNavigation />
            <main>
                {/* ONE WAY TO DISPLAY A LOADING WHEN DATA IS STILL PROCCESSING WITH USENAVIGATION*/}
                {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout;