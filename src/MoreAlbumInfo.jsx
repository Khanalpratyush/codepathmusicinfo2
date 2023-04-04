import React from "react";
import { useLocation} from "react-router-dom";

const MoreAlbumInfo = () => {
    const location = useLocation();
    const {albumInfo} = location.state;

    return (<div className="more-info">
                {albumInfo && <div className="additional-info">
                    <img src={albumInfo.images[0].url} />
                    <div className='album-card'>
                                    <h2>{albumInfo.name}</h2>
                                    <div>
                                        <p><span className="heading">Artists</span> {albumInfo.artists.map((artist) => <span className="info">{artist.name}</span>)}</p>
                                        <p><span className="heading">Copyrights</span> {albumInfo.copyrights.map((copyright) => <span className="info">{copyright.text}</span>)}</p>
                                        <p><span className="heading">Label</span> <span className="info">{albumInfo.label}</span></p>
                                        <p><span className="heading">Popularity</span> <span className="info">{albumInfo.popularity}</span></p>
                                        <p><span className="heading">Release Date</span> <span className="info">{albumInfo.release_date}</span></p>
                                        <p><span className="heading">Total Tracks</span> <span className="info">{albumInfo.total_tracks}</span></p>
                                    </div>
                    </div>

                </div>}
            </div>
    )
}


export default MoreAlbumInfo;