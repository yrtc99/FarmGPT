import { ChangeEvent, useContext } from "react";
import { InputContext } from "../InputContext";


export default function Environments() {
  // const { userData, setUserData } = useContext(InputContext);

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setUserData({ ...userData?.[name], [name]: value });
    
  // };

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-1">
      {/**總面積: ha公頃 */}
      <div className="w-1/3 mx-2 flex-1 space-y-2">
        <div className="inputTitle">欲評估之場域面積</div>

        <input
          // onChange={handleChange}
          // value={userData["A"] || ""}
          name="A"
          placeholder="單位: 公頃(ha)"
          type="text"
          className="inputStyle "
        />
      </div>

      {/**時間: yr年*/}
      <div className="w-1/3 mx-2 flex-1 space-y-2">
        <div className="inputTitle ">專案期間</div>

        <input
          // onChange={handleChange}
          // value={userData["yr"] || ""}
          name="yr"
          placeholder="單位: 年(yr)"
          type="text"
          className="inputStyle "
        />
      </div>
    </div>
  );
}

