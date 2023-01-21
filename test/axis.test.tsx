import { fireEvent, render } from '@testing-library/react'
import { properties } from 'src/constants/properties';
import { axisType } from 'src/type/axis.type';
import Axis from 'src/components/axis';

describe('Axis', () => {
  it('should render the select element with the options for the current axis', () => {
    const setAxisVal = jest.fn();
    const axisType = 'X';
    const notSelectedAxisVal = 'protein';
    const { getByText } = render(
      <Axis
        setAxisVal={setAxisVal}
        axisType={axisType}
        notSelectedAxisVal={notSelectedAxisVal}
      />
    );

    // check if all the options are present
    properties.forEach((property) => {
      if (property != notSelectedAxisVal) {
        expect(getByText(property)).toBeInTheDocument();
      }
    });
  });

  it('should set the axis value when an option is selected', () => {
    const setAxisVal = jest.fn();
    const axisType = 'X';
    const notSelectedAxisVal = 'protein';
    render(
      <Axis
        setAxisVal={setAxisVal}
        axisType={axisType}
        notSelectedAxisVal={notSelectedAxisVal}
      />
    );

    // X軸の値を"fiber"で選択状態にする
    const selectElement = document.getElementById(`axis${axisType}`) as HTMLSelectElement;
    selectElement.options[3].setAttribute("selected", "selected");
    const selectedValue = selectElement.options[3].value;

    fireEvent.change(selectElement, { target: { value: selectedValue } });

    expect(setAxisVal).toHaveBeenCalledWith(selectedValue as axisType);
  });
});