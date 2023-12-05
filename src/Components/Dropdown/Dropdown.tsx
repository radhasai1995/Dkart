import { useState } from "react";
import useAlphaVantage from "./useAlphaVantage";

function Dropdown() {
  const [symbol, setSymbol] = useState("");
  const dataAlpha = useAlphaVantage(`?symbol=${symbol}`);
  if (!dataAlpha) return <div className="loading">Loading...</div>;
  let list: [] = [];//dataAlpha.map((itm: any) => itm?.description) ||[];

  return (
    <div style={{ padding: 20 }}>
      <select
        style={{ width: 300 }}
        className="select"
        value={symbol}
        onChange={e => {
          setSymbol(e.target.value);
        }}
      >
        {list.map((itm: string) => {
          return (
            <option key={itm} value={itm}>
              {itm}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Dropdown;
export { Dropdown };
