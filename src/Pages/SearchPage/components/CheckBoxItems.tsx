import CheckboxInputItem from "./CheckboxInputItem";

const CheckBoxItems = () => {
  return (
    <>
      <CheckboxInputItem
        id="albumID"
        name="Album"
        value="album"
        type="checkbox"
      />
      <CheckboxInputItem
        id="artistID"
        name="Artist"
        value="artist"
        type="checkbox"
      />
      <CheckboxInputItem
        id="trackID"
        name="Track"
        value="track"
        type="checkbox"
      />
      <CheckboxInputItem
        id="playlistID"
        name="Playlist"
        value="playlist"
        type="checkbox"
      />
    </>
  );
};

export default CheckBoxItems;
