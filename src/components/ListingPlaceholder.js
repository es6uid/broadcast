import placeholder from '../placeholder.jpeg';
const ListingPlaceholder = () => {
    return(
        <div className="col-4">
            <div className="card" aria-hidden="true">
                <img src={placeholder} className="card-img-top" alt="aiImage" />
                <div className="card-body">
                <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                </p>
                <button className="btn disabled bg-dark bg-opacity-50 placeholder col-2 border-0 me-2"></button>
                <button className="btn disabled bg-dark bg-opacity-50 placeholder col-2 border-0"></button>
                </div>
            </div>
        </div>   
    )
}
export default ListingPlaceholder;