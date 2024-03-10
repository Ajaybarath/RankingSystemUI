import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { PlusOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CandidateList = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0); // Initialize total with 0
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchData = async () => {
        try {
            const url = `${apiUrl}/api/v1/candidate?page=${page}&size=${rowsPerPage}`;
            const response = await axios.get(url);
            setData(response.data.result.data);
            setTotal(response.data.result.total); // Set total count of items
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset page number when rows per page changes
    };

    const handleRowClick = (record) => {
        // Add your logic here
        // navigate(`/examResult?rollNum=${record.rollNumber}`);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ROLL NUM</TableCell>
                            <TableCell>NAME</TableCell>
                            <TableCell>GENDER</TableCell>
                            <TableCell>CATEGORY</TableCell>
                            <TableCell>STATE</TableCell>
                            <TableCell>TOTAL MARKS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.rollNumber} onClick={() => handleRowClick(row)}>
                                <TableCell>{row.rollNumber}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.gender}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>{row.state}</TableCell>
                                <TableCell>{row.totalMarks}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={total} // Set the total count of items
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default CandidateList;
