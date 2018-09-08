import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };

  static getDerivedStateFromProps(props) {
    const media = props.media;
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }
    return { photos };
    // react calls this static method to merge the state with the state derived from props recieved from this method
  }
  handleIndexClick = event => {
    this.setState({ active: +event.target.dataset.index });
  };
  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active].value} alt="primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            /* eslint-disable-next-line */
            <img
              onClick={this.handleIndexClick}
              src={photo.value}
              key={photo.value}
              data-index={index}
              className={index === active ? "active" : ""}
              alt="alternate thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
