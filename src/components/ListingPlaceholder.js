import placeholder from '../placeholder.jpeg';
const ListingPlaceholder = () => {
    return(
        <div className="col-4">
            <div class="card" aria-hidden="true">
                <img src={placeholder} className="card-img-top" alt="aiImage" />
                <div class="card-body">
                <h5 class="card-title placeholder-glow">
                    <span class="placeholder col-6"></span>
                </h5>
                <p class="card-text placeholder-glow">
                    <span class="placeholder col-7"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-6"></span>
                    <span class="placeholder col-8"></span>
                </p>
                <button class="btn disabled bg-dark bg-opacity-50 placeholder col-2 border-0 me-2"></button>
                <button class="btn disabled bg-dark bg-opacity-50 placeholder col-2 border-0"></button>
                </div>
            </div>
        </div>   
    )
}
export default ListingPlaceholder;