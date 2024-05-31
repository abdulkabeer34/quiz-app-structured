import React, { useEffect } from 'react';
import { Table } from 'antd';
import './style.scss';
import { Skeleton,Empty } from 'antd';
import { FullWidthSkeletonInput } from './styled-components';
import { formatQuizHistoryData ,useQuizHistory, COLUMNS} from '../../../UseCases';

export const QuizHistory = () => {
  const token = localStorage.getItem('token');
  let { queryData } = useQuizHistory(false,token);
  let { data } = queryData;

  useEffect(() => {
    document.title = "History";
  }, [])

  return (
    <div className='history-main'>
      <div className='upper-area flex  align-center justify-between'>
        <h2 className='heading'>Your Past Quiz History:</h2>
      </div>
      <Table
        columns={COLUMNS}
        rowKey={(e) => e.dataId}
        locale={{
          emptyText: !data ?  Array(10).fill(null).map(()=> <FullWidthSkeletonInput   active/>)  : <Empty  />,
        }}
        dataSource={formatQuizHistoryData({ data })}
      >
        <Skeleton active={true} />
      </Table>
    </div>
  );
};
