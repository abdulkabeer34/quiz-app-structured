import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { StyledIcon } from "./StyledComponents";



export const FloatingButtonAntd = ({animation,callback,icon:Icon,tooltip,...restProps}) => {
  return (
    <StyledIcon
    color="blue"
      icon={Icon?<Icon/>:<PlusOutlined />}
      $animation={animation}
      onClick={callback}
      style={{ right: 60 }}
      {...restProps}
      tooltip={tooltip==false?false:<div>{tooltip?tooltip:"Add Something"}</div>}
    />
  );
};
