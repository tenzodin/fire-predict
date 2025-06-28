export default function GradientBackground() {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "linear-gradient(106.89deg, rgba(192, 132, 252, 0.25) 15.73%, rgba(14, 165, 233, 0.6) 15.74%, rgba(232, 121, 249, 0.4) 56.49%, rgba(79, 70, 229, 0.5) 115.91%)",
        filter: "blur(80px)", // reduced blur
        opacity: 0.8, // increased visibility
      }}
    />
  );
}
