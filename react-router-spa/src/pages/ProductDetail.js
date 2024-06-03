import { useParams, Link } from 'react-router-dom';



function ProductDetailPage() {
    const params = useParams();

    return (
        <>
            <h1>Product Details</h1>
            <p>{params.productId}</p>
            {/* .. in to is a history back, relative goes back one "page back" */}
            <p><Link to=".." relative='path'>Back</Link></p>
        </>
    )
}

export default ProductDetailPage;