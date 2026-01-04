import './styles/App.css';
import Layout from './layout/Layout';
import Products from './pages/Products/Products';
import ProductProvider from './providers/ProductProvider';

function App() {
  return (
    <Layout>
      <ProductProvider>
        <Products />
      </ProductProvider>
    </Layout>
  );
}

export default App;
