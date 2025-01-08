import { useSelector } from "react-redux";

export default function ProgressBar() {
  const step = useSelector((state) => state.form.step);

  const totalSteps = 6;
  const progress = ((step - 1) / totalSteps) * 100;

  return (
    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
      <div
        className="absolute top-0 left-0 h-full bg-blue-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
