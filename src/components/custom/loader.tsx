import { ScaleLoader } from 'react-spinners';

const Loader = ({
  height,
  width,
  radius,
  margin,
  color,
  loading,
  cssOverride,
  speedMultiplier,
  bgColor,
}: {
  height: number;
  width: number;
  radius: number;
  margin: number;
  color: string;
  loading: boolean;
  cssOverride: void;
  speedMultiplier: number;
  bgColor: string;
}) => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[`${bgColor}`]">
      <ScaleLoader {...Loader} />
    </div>
  );
};

export default Loader;
