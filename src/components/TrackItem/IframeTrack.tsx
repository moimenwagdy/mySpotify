const IframeTrack: React.FC<{ id: string }> = ({id}) => {
  return (
    <iframe
      className="w-full  mx-auto rounded-xl"
      src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`}
      height="80"
      allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"></iframe>
  );
};

export default IframeTrack;
