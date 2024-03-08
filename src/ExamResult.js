import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ExamResult.css';
import { FaTelegramPlane } from 'react-icons/fa';


const ExamResult = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const value1 = searchParams.get('url');
    const value2 = searchParams.get('category');
    const value3 = searchParams.get('state');
    const value4 = searchParams.get('gender');
    const value5 = searchParams.get('rollNum');
    const [loading, setLoading] = useState(true);


    const [result1, setResult1] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [result2, setResult2] = useState('');
    const [result3, setResult3] = useState('');
    const [result4, setResult4] = useState('');
    const [result5, setResult5] = useState('');

    const [refreshed, setRefreshed] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // Check if the page is refreshed
        const isPageRefreshed = window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD;

        // If the page is refreshed, redirect to login page

    }, []);


    useEffect((event) => {
        const fetchData = async () => {
            try {
                console.log("starting the url");
                if (value5) {
                    const url = `${apiUrl}/api/v1/candidate/?rollNum=${value5}`;
                    console.log(url);
                    const response1 = await axios.get(url);

                    setResult1(response1.data);
                    setRollNum(response1.data.result.rollNumber);
                    value2 = response1.data.result.category;
                    
                } else {
                    const url = `${apiUrl}/api/v1/candidate/scrape?url=${value1}&category=${value2}&state=${value3}&gender=${value4}`;
                    console.log(url);
                    const response1 = await axios.post(url);

                    setResult1(response1.data);
                    setRollNum(response1.data.result.rollNumber);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [value1, value2, value3, value4]);

    useEffect(() => {

        const fetchRankData = async () => {
            try {

                if (rollNum) {
                    const response2 = await axios.get(`${apiUrl}/api/v1/candidate/rank`, {
                        params: {
                            rollNum: rollNum
                        }
                    });
                    setResult2(response2.data);
                    
                    const response3 = await axios.get(`${apiUrl}/api/v1/candidate/rankByCategory`, {
                        params: {
                            rollNum: rollNum,
                            category: value2
                        }
                    });
                    setResult3(response3.data);

                    const response4 = await axios.get(`${apiUrl}/api/v1/candidate/rankByGender`, {
                        params: {
                            rollNum: rollNum,
                            gender: value4
                        }
                    });
                    setResult4(response4.data);

                    const response5 = await axios.get(`${apiUrl}/api/v1/candidate`, {
                        params: {
                            rollNum: rollNum
                        }
                    });
                    setResult5(response5.data);
                    setLoading(false);
                }

            } catch (error) {
                console.error('Error fetching rank data:', error);
            }
        };

        fetchRankData();

    }, [result1]);

    if (refreshed) {
        navigate('/');
    }

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="exam-page">
                    <h1>{result1 && result1.result && result1.result.subject}</h1>
                    <div className="exam-info">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Name:</th>
                                    <td className='tableData'>{result1 && result1.result && result1.result.name}</td>
                                </tr>
                                <tr>
                                    <th>Roll Number:</th>
                                    <td className='tableData'>{result1 && result1.result && result1.result.rollNumber}</td>
                                </tr>
                                <tr>
                                    <th>Exam Date:</th>
                                    <td className='tableData'>{result1 && result1.result && result1.result.examDate}</td>
                                </tr>
                                <tr>
                                    <th>Exam Time:</th>
                                    <td className='tableData'>{result1 && result1.result && result1.result.examTime}</td>
                                </tr>
                                <tr>
                                    <th>Venue Name:</th>
                                    <td className='tableData'>{result1 && result1.result && result1.result.venueName}</td>
                                </tr>
                                <tr>
                                    <th>Subject:</th>
                                    <td className='tableData'>{result1 && result1.result && result1.result.subject}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='rankHeading'>
                        <p className='rankText'>
                            Your Rank Among Karnataka Candidates
                        </p>
                    </div>

                    <div className='rankContainer'>
                        <div className='rankContainerRow'>
                            <div className='rankCard'>
                                <p className='rankTitle'>Rank</p>
                                <p className='rankScore'>{result2 && result2.result && result2.result.rank} / {result2 && result2.result && result2.result.total}</p>
                            </div>
                            <div className='rankCard'>
                                <p className='rankTitle'>Category Rank</p>
                                <p className='rankScore'>{result3 && result3.result && result3.result.rank} / {result3 && result3.result && result3.result.total}</p>
                            </div>
                            <div className='rankCard'>
                                <p className='rankTitle'>Gender Rank</p>
                                <p className='rankScore'>{result4 && result4.result && result4.result.rank} / {result4 && result4.result && result4.result.total}</p>
                            </div>
                        </div>
                        {/* <div className='rankContainerRow'>
                    <div className='rankCard'>
                        <p className='rankTitle'>Rank</p>
                        <p className='rankScore'>934 / 972</p>
                    </div>
                    <div className='rankCard'>
                        <p className='rankTitle'>Rank</p>
                        <p className='rankScore'>934 / 972</p>
                    </div>
                    <div className='rankCard'>
                        <p className='rankTitle'>Rank</p>
                        <p className='rankScore'>934 / 972</p>
                    </div>
                </div> */}
                    </div>

                    <div className='rankHeading'>
                        <p className='rankText'>
                            Marks In Each Sections
                        </p>
                    </div>

                    <div className='markTableContainer'>
                        <table className='markTable'>
                            <thead className='markHead'>
                                <tr>
                                    <th>Subject</th>
                                    <th>Attempted</th>
                                    <th>Not Attempted</th>
                                    <th>Right</th>
                                    <th>Wrong</th>
                                    <th>Marks</th>
                                </tr>
                            </thead>
                            <tbody className='markBody'>
                                {result5 && result5.result && result5.result.sections.map((section, index) => (
                                    <tr className='markRow' key={section.secId}>
                                        <td>Section {index += 1}</td>
                                        <td>{section.attempted}</td>
                                        <td>{section.notAttempted}</td>
                                        <td>{section.right_answered}</td>
                                        <td>{section.wrong_answered}</td>
                                        <td>{section.totalMarks}</td>
                                    </tr>
                                ))}
                                <tr className='markTotalRow'>
                                    <td>OverAll</td>
                                    <td>{result5 && result5.result && result5.result.totalAttempted}</td>
                                    <td>{result5 && result5.result && result5.result.totalNotAttempted}</td>
                                    <td>{result5 && result5.result && result5.result.totalRight}</td>
                                    <td>{result5 && result5.result && result5.result.totalWrong}</td>
                                    <td>{result5 && result5.result && result5.result.totalMarks}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <footer>
                <p>Follow us on Telegram:</p>
                <a href="https://t.me/the_target100" target="_blank" rel="noopener noreferrer">
                    <FaTelegramPlane />  THE TARGET 100 (SSC in KANNADA)
                </a>
            </footer>
        </div >
    );
}

export default ExamResult;