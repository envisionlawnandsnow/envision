export default function VideoShowcase() {
  return (
    <div className="video-placeholder">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/video-poster.jpg"
        aria-label="Envision LawnCare mowing a customer property"
      >
        <source src="/videos/envision-in-the-field.mp4" type="video/mp4" />
      </video>
      <div className="video-shade" />
      <div className="video-label">
        <span>In the field</span>
        <p>See Envision LawnCare in action</p>
      </div>
    </div>
  );
}
