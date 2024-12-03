import { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { getAggregatedRevenue } from "../../utils/api";
import { getCountryFlagEmoji } from "../../utils/utils";
import styles from "../Clients/styles.module.css";
import adminstyles from "./styles.module.css";

const AdminDashboard = () => {
  const [revenueData, setRevenueData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setLoading(true);
        const data = await getAggregatedRevenue();
        setRevenueData(data);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);
  const downloadCSV = () => {
    const rows = [["Country", "Total Revenue"]];
    Object.entries(revenueData).forEach(([country, revenue]) => {
      rows.push([country, revenue]);
    });

    const csvContent = rows.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "revenue_data.csv");
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /*   if (loading) {
    return <div>Loading...</div>; // Simple loading message, you can replace this with a spinner
  } */

  return (
    <PageWrapper title="Admin">
      <div className={adminstyles.admincontainer}>
        <div className={adminstyles.header}>
          <h2>Revenue Aggregated by Country</h2>
        </div>

        {/* Show loading message */}
        {loading && <p>Please wait...</p>}

        {/* Show table if data is loaded and not empty */}
        {!loading && revenueData && Object.keys(revenueData).length > 0 && (
          <table className={styles.clientsTable}>
            <thead>
              <tr>
                <th>Country</th>
                <th>Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(revenueData).map(([country, revenue]) => (
                <tr key={country}>
                  <td>
                    <span
                      className={styles.countryIcon}
                      role="img"
                      title={country}
                    >
                      {country} {getCountryFlagEmoji(country)}
                    </span>
                  </td>
                  <td>{revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Show message if data is not available */}
        {!loading &&
          (!revenueData || Object.keys(revenueData).length === 0) && (
            <p>No data available.</p>
          )}
      </div>

      {/* Download CSV Button */}
      <button className={adminstyles.downloadbutton} onClick={downloadCSV}>
        Download CSV
      </button>
    </PageWrapper>
  );
};

export default AdminDashboard;
