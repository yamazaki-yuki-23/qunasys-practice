import { properties } from 'src/constants/properties';
import { axisType } from 'src/type/axis.type';

export default function Axis(props: {
  setAxisVal: React.Dispatch<React.SetStateAction<axisType>>;
  axisType: 'X' | 'Y';
  notSelectedAxisVal: axisType;
}) {
  const { setAxisVal, axisType, notSelectedAxisVal } = props;

  // X軸、Y軸のいずれかで値を決定
  const handleChange = (val: axisType) => {
    setAxisVal(val);
  };

  return (
    <>
      <div>
        現在の{axisType}軸：
        <select onChange={(e) => handleChange(e.target.value as axisType)}>
          {properties.map(
            (property) =>
              property != notSelectedAxisVal && (
                <option key={property} value={property}>
                  {property}
                </option>
              )
          )}
        </select>
      </div>
    </>
  );
}
