import { useEffect, useState } from "react";
import api from "../../api/axios";

const Reports = () => {
  const [report, setReport] = useState({ totalOrders: 0, byStatus: {} });

  useEffect(() => {
    api.get("/admin/reports").then((res) => setReport(res.data));
  }, []);

  return (
    <section>
      <h2>Reports</h2>
      <div className="card">
        <p>Total Orders: {report.totalOrders}</p>
        {Object.entries(report.byStatus).map(([status, count]) => (
          <p key={status}>
            {status}: {count}
          </p>
        ))}
      </div>
    </section>
  );
};

export default Reports;
