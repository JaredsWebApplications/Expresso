import './home.css';
import ItemCard from './ItemCard';
import Header from './Header';

function Home() {
    return (
    <>
        <Header />
        <div id='menu-container'>
            <h4>Hot Coffees</h4>
            <ItemCard name='Latte' imgSrc='latte.png' description='Rich espresso balanced with steamed milk and a light layer of foam.' />
            <ItemCard name='Cafe Mocha' imgSrc='cafe-mocha.png' description='Rich, full-bodied espresso combined with bittersweet mocha sauce and steamed milk, then topped with sweetened whipped cream.' />
            <br/>
            <h4>Iced Coffees</h4>
            <ItemCard name='Iced Latte' imgSrc='latte-iced.png' description='Rich, full-bodied espresso combined with bittersweet mocha sauce, milk and ice, then topped with sweetened whipped cream.' />
            <ItemCard name='Iced Cafe Mocha' imgSrc='cafe-mocha-iced.png' description='Rich, full-bodied espresso combined with bittersweet mocha sauce, milk and ice, then topped with sweetened whipped cream.' />
        </div>
    </>
    );
}

export default Home;
