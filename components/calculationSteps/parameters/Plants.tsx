import { ChangeEvent, useContext } from "react";
import { InputContext } from "../InputContext";


function Plants() {
  // const { userData, setUserData } = useContext(InputContext);

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setUserData({ ...userData, [name]: value });
    
  // };

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-1">
      {/**n = 枯落物之分層數； */}
      <div className="w-1/3 mx-2 flex-1 space-y-2">
        <div className="inputTitle">
        枯落物之分層數
        </div>
        
          <input
            // onChange={handleChange}
            // value={userData["n"] || ""}
            name="n"
            placeholder="枯落物之分層數量"
            type="text"
            className="inputStyle"
          />
        
      </div>

      {/**Lj = 各層之枯落物重(kg)； */}
      <div className="w-1/3 mx-2 flex-1 space-y-2">
        <div className="inputTitle">
        各層之枯落物重
        </div>
        
          <input
            // onChange={handleChange}
            // value={userData["Lj"] || ""}
            name="Lj"
            placeholder="單位: kg，各層用空格分開表示"
            type="text"
            className="inputStyle"
          />
        
      </div>

      

      {/**Cj = 各層之枯落物碳濃度(%)。 */}
      <div className="w-1/3 mx-2 flex-1 space-y-2">
        <div className="inputTitle">
        各層之枯落物碳濃度
        </div>
        
          <input
            // onChange={handleChange}
            // value={userData["Cj"] || ""}
            name="Cj"
            placeholder="單位: %，各層用空格分開表示"
            type="text"
            className="inputStyle"
          />
        
      </div>

      
    </div>
  );
}

export default Plants;
