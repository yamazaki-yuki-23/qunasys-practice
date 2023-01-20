export default function Search(props: {
  setSearchMfrKey: React.Dispatch<React.SetStateAction<string>>;
  setSearchTypeKey: React.Dispatch<React.SetStateAction<string>>;
  uniqMfrArr: string[];
  uniqTypeArr: string[];
}) {
  const { setSearchMfrKey, setSearchTypeKey, uniqMfrArr, uniqTypeArr } = props;

  // 絞り込み検索キーをセット
  const handleMfrChange = (val: (typeof uniqMfrArr)[number]) => {
    setSearchMfrKey(val);
  };

  const handleTypeChange = (val: (typeof uniqMfrArr)[number]) => {
    setSearchTypeKey(val);
  };

  return (
    <>
      <div>
        <label>mfr ：</label>
        <select onChange={(e) => handleMfrChange(e.target.value)}>
          <option value=''>選択してください</option>
          {uniqMfrArr.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>type：</label>
        <select onChange={(e) => handleTypeChange(e.target.value)}>
          <option value=''>選択してください</option>
          {uniqTypeArr.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
