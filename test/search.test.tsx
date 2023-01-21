import { fireEvent, render } from '@testing-library/react'
import Search from 'src/components/search';

describe('Search', () => {
  it('should call the setSearchMfrKey function when the mfr select is changed', () => {
    const mockSetSearchMfrKey = jest.fn();
    const mockUniqMfrArr = ['N', 'Q', 'K', 'R', 'G', 'P', 'A'];

    render(
      <Search
        setSearchMfrKey={mockSetSearchMfrKey}
        setSearchTypeKey={jest.fn()}
        uniqMfrArr={mockUniqMfrArr}
        uniqTypeArr={[]}
      />
    );

    // mfrの検索値を"Q"で選択状態にする
    const mfrSelect = document.getElementById('mfrSearch') as HTMLSelectElement;
    fireEvent.change(mfrSelect, { target: { value: mockUniqMfrArr[1] } });

    expect(mockSetSearchMfrKey).toHaveBeenCalledWith(mockUniqMfrArr[1]);
  });

  it('should call the setSearchTypeKey function when the type select is changed', () => {
    const mockSetSearchTypeKey = jest.fn();
    const mockUniqTypeArr = ['C', 'H'];

    render(
      <Search
        setSearchMfrKey={jest.fn()}
        setSearchTypeKey={mockSetSearchTypeKey}
        uniqMfrArr={[]}
        uniqTypeArr={mockUniqTypeArr}
      />
    );

    // typeの検索値を"H"で選択状態にする
    const typeSelect = document.getElementById('typeSearch') as HTMLSelectElement;
    fireEvent.change(typeSelect, { target: { value: mockUniqTypeArr[1] } });

    expect(mockSetSearchTypeKey).toHaveBeenCalledWith(mockUniqTypeArr[1]);
  });
});