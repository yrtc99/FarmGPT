import { ChangeEvent, useContext } from "react";
import { InputContext } from "../InputContext";



export default function Soil() {
  
  // const { userData, setUserData } = useContext(InputContext);
  
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

    
  //   setUserData({ ...userData, [name]: value });
    
  // };

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-1">
      {/**土壤分層數(k) */}
      <div className="w-2/3 mx-2 flex-1 space-y-2">
        <div className="inputTitle">土壤分層數</div>

        <input
          // onChange={handleChange}
          // value={userData["k"] || ""}
          name="k"
          placeholder="土壤分層數量"
          type="text"
          className="inputStyle"
        />
      </div>

      {/**Ci = 各層之土壤有機碳濃度(%)； */}
      <div className="w-2/3 mx-2 flex-1 space-y-2">
        <div className="inputTitle">各層土壤有機碳濃度</div>

        <input
          // onChange={handleChange}
          // value={userData["Ci"] || ""}
          name="Ci"
          placeholder="單位: %，各層用空格分開表示"
          type="text"
          className="inputStyle"
        />
      </div>

      {/**Di = 各層之土壤厚度(m)； */}
      <div className="w-2/3 mx-2 flex-1 space-y-2">
        <div className="inputTitle">各層之土壤厚度</div>

        <input
          // onChange={handleChange}
          // value={userData["Di"] || ""}
          name="Di"
          placeholder="單位: 公尺(m)，各層用空格分開表示"
          type="text"
          className="inputStyle"
        />
      </div>

      {/**Bi = 各層之土壤容積密度(kg m-3)； */}
      <div className="w-2/3 mx-2 flex-1 space-y-2">
        <div className="inputTitle">各層之土壤容積密度</div>

        <input
          // onChange={handleChange}
          // value={userData["Bi"] || ""}
          name="Bi"
          placeholder="單位: kg/m^3，各層用空格分開表示"
          type="text"
          className="inputStyle"
        />
      </div>

      {/**Fi = 各層之細土密度(kg m-3)。 */}
      <div className="w-2/3 mx-2 flex-1 space-y-2">
        <div className="inputTitle">各層之細土密度</div>

        <input
          // onChange={handleChange}
          // value={userData["Fi"] || ""}
          name="Fi"
          placeholder="單位: kg/m^3，各層用空格分開表示"
          type="text"
          className="inputStyle"
        />
      </div>
    </div>
  );
}
