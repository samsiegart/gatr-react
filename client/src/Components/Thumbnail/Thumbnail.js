import MyThumbnail from '../MyThumbnail/MyThumbnail';
import RemoteThumbnail from '../RemoteThumbnail/RemoteThumbnail';
import './Thumbnail.css';

function Thumbnail() {
    return (
        <div className="thumbnail">
            <RemoteThumbnail />
            <MyThumbnail />
        </div>
    );
}

export default Thumbnail;