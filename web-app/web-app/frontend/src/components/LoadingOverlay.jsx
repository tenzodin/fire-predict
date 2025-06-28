// src/components/LoadingOverlay.jsx
import { RingLoader } from "react-spinners";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <RingLoader color="#f87171" size={120} /> {/* red-400 */}
    </div>
  );
}
