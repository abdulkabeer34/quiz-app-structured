import React from "react";
import { Table } from "antd";
import "./style.scss";
import { Skeleton,Empty } from "antd";
import { FullWidthSkeletonInput } from "./StyledComponets";
import { FormatQuizHistoryData ,useQuizHistoryQuery, Columns} from "../../../UseCases";

export const QuizHistory = () => {
  const token = localStorage.getItem("token");
  let { queryData } = useQuizHistoryQuery(false,token);
  let { data } = queryData;



  return (
    <div className="history-main">
      <div className="upper-area">
        <h2>Your Past Quiz History:</h2>
      </div>
      <Table
        columns={Columns}
        rowKey={(e) => e.dataId}
        locale={{
          emptyText: !data ?  Array(10).fill(null).map(()=> <FullWidthSkeletonInput   active/>)  : <Empty  />,
        }}
        dataSource={FormatQuizHistoryData({ data })}
      >
        <Skeleton active={true} />
      </Table>
    </div>
  );
};
