import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './CandateList.css';
import { useNavigate } from 'react-router-dom';


const CanditateList = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchData = async () => {
        try {
            const url = `${apiUrl}/api/v1/candidate?page=${(page - 1)}&&size=10`;
            const response = await axios.get(url);
            console.log(response.data.result.data);
            setData(response.data.result.data);
            setTotal(response.data.result.totalPages);
            console.log(pagination.current);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const columns = [
        {
            title: 'ROLL NUM',
            dataIndex: 'rollNumber',
            key: 'rollNumber',
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'GENDER',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'CATEGORY',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'STATE',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'TOTAL MARKS',
            dataIndex: 'totalMarks',
            key: 'totalMarks',
        }
    ];

    const pagination = {
        total: total,
        pageSize: 10,
        current: page,
        onChange: (page) => setPage(page),
    };


    const handleRowClick = (record) => {
        // console.log('Row clicked:', record);
        // // Add your own logic here

        // navigate(`/examResult?rollNum=${record.rollNumber}`);

    };

    return (
        <div>
            <Table className='antTable'
                columns={columns} dataSource={data}
                pagination={pagination}
                onRow={(record) => ({ onClick: () => handleRowClick(record) })}
                onChange={(pagination) => {
                    console.log(pagination.current);
                    return setPage(pagination.current)
                }}
                rowKey='rollNumber' />
        </div>
    );
};

export default CanditateList;