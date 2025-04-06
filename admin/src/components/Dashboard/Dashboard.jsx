import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [medicineAvailability, setMedicineAvailability] = useState(36);
    const [totalOrders, setTotalOrders] = useState(50);
    const [totalRevenue, setTotalRevenue] = useState(12000); // Approx revenue
    const [customerSatisfaction, setCustomerSatisfaction] = useState([40, 30, 20, 5, 5]); // Good satisfaction data
    const [medicineList, setMedicineList] = useState([]);

    useEffect(() => {
        // Manually set medicine list data
        setMedicineList([
            { id: 1, name: 'Paracetamol', availability: 100, orders: 25 },
            { id: 2, name: 'Ibuprofen', availability: 50, orders: 15 },
            { id: 3, name: 'Amoxicillin', availability: 30, orders: 10 },
        ]);
    }, []);

    const styles = {
        container: {
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            color: '#333',
        },
        summary: {
            display: 'flex',
            justifyContent: 'space-around',
            margin: '20px 0',
        },
        summaryItem: {
            fontSize: '18px',
            color: '#555',
            margin: '0 10px',
        },
        chart: {
            margin: '20px 0',
        },
        medicineList: {
            marginTop: '20px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        tableHeader: {
            backgroundColor: '#f4f4f4',
            fontWeight: 'bold',
            border: '1px solid #ddd',
            padding: '8px',
        },
        tableCell: {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'center',
        },
        tableRow: {
            backgroundColor: '#fff',
        },
    };

    const satisfactionData = {
        labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
        datasets: [
            {
                label: 'Customer Satisfaction Levels',
                data: customerSatisfaction,
                backgroundColor: ['#4caf50', '#8bc34a', '#ffeb3b', '#ff9800', '#f44336'],
            },
        ],
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Admin Dashboard</h1>
            <div style={styles.summary}>
                <h2 style={styles.summaryItem}>Total Medicine Availability: {medicineAvailability}</h2>
                <h2 style={styles.summaryItem}>Total Orders: {totalOrders}</h2>
                <h2 style={styles.summaryItem}>Total Revenue This Month: ₹{totalRevenue}</h2>
            </div>
            <div style={styles.chart}>
                <h2 style={styles.title}>Customer Satisfaction</h2>
                <Bar data={satisfactionData} />
            </div>
            <div style={styles.medicineList}>
                <h2 style={styles.title}>Medicine List</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Medicine Name</th>
                            <th style={styles.tableHeader}>Availability</th>
                            <th style={styles.tableHeader}>Orders</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicineList.map((medicine) => (
                            <tr key={medicine.id} style={styles.tableRow}>
                                <td style={styles.tableCell}>{medicine.name}</td>
                                <td style={styles.tableCell}>{medicine.availability}</td>
                                <td style={styles.tableCell}>{medicine.orders}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
