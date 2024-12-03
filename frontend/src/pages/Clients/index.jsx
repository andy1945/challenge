import { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { getClients } from "../../utils/api";
import { getCountryFlagEmoji } from "../../utils/utils";
import styles from "./styles.module.css";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Start loading before fetching data
    getClients()
      .then((res) => {
        setClients(res);
      })
      .catch((error) => {
        //To be implemented
        console.error("Error fetching clients:", error); // Handle any errors
      })
      .finally(() => {
        setLoading(false); // Stop loading after the fetch is complete
      });
  }, []);

  return (
    <PageWrapper title="Clients">
      {/* Show loading message */}
      {loading && <p>Please wait...</p>}

      {/* Show table if data is loaded and not empty */}
      {!loading && clients && Object.keys(clients).length > 0 && (
        <table className={styles.clientsTable}>
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => {
              return (
                <tr key={c.id}>
                  <td>
                    <span
                      className={styles.countryIcon}
                      role="img"
                      title={c.country}
                    >
                      {getCountryFlagEmoji(c.country)}
                    </span>
                  </td>
                  <td>{c.name}</td>
                  <td>{c.revenue}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {!loading && (!clients || Object.keys(clients).length === 0) && (
        <p>No data available.</p>
      )}
    </PageWrapper>
  );
};

export default Clients;
