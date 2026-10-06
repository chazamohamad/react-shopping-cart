import { useEffect, useState, useRef } from "react";

import API from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  FaBox,
  FaShoppingCart,
  FaClock,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,

    totalOrders: 0,

    pendingOrders: 0,

    completedOrders: 0,

    onDeliveryOrders: 0,
  });
  const years = [2024, 2025, 2026, 2027];
  const [openYear, setOpenYear] = useState(false);

  const yearRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (yearRef.current && !yearRef.current.contains(event.target)) {
        setOpenYear(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [monthlyOrders, setMonthlyOrders] = useState([]);

  const [statusData, setStatusData] = useState([]);

  const [loading, setLoading] = useState(true);

  const getDashboardData = async () => {
    try {
      setLoading(true);

      // DASHBOARD CARDS

      const statsResponse = await API.get("/api/dashboard/stats");

      setStats(statsResponse.data);

      // MONTHLY COMPLETED ORDERS

      const ordersResponse = await API.get(
        `/api/orders/completed-by-month?year=${selectedYear}`,
      );

      const chartData = Object.entries(ordersResponse.data.statistics).map(
        ([month, value]) => ({
          month,

          orders: value,
        }),
      );

      setMonthlyOrders(chartData);

      // STATUS STATISTICS

      const statusResponse = await API.get("/api/orders/status-statistics");

      const statusChart = Object.entries(statusResponse.data.statistics).map(
        ([status, data]) => ({
          status,

          orders: data.count,

          percentage: data.percentage,
        }),
      );

      setStatusData(statusChart);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, [selectedYear]);

  if (loading) {
    return (
      <p
        className="
      text-center
      mt-10
      text-primary
      font-bold
      "
      >
        Loading dashboard...
      </p>
    );
  }

  const cards = [
    {
      title: "Products",

      value: stats.totalProducts,

      description: "Total products",

      icon: <FaBox />,
    },

    {
      title: "Orders",

      value: stats.totalOrders,

      description: "Total orders",

      icon: <FaShoppingCart />,
    },

    {
      title: "Pending",

      value: stats.pendingOrders,

      description: "Waiting processing",

      icon: <FaClock />,
    },

    {
      title: "On Delivery",

      value: stats.onDeliveryOrders,

      description: "Currently shipping",

      icon: <FaTruck />,
    },

    {
      title: "Completed",

      value: stats.completedOrders,

      description: "Delivered orders",

      icon: <FaCheckCircle />,
    },
  ];

  const COLORS = ["#db9558", "#71845a", "#30382c"];

  return (
    <div>
      {/* HEADER */}

      <div
        className="
flex
flex-col
md:flex-row
md:justify-between
md:items-center
gap-5
mb-8
"
      >
        <div>
          <p
            className="
text-accent
text-xs
uppercase
tracking-widest
font-bold
"
          >
            ADMIN PANEL
          </p>

          <h1
            className="
text-3xl
md:text-4xl
font-bold
text-primary
"
          >
            Dashboard Overview
          </h1>

          <p
            className="
text-gray-500
mt-2
"
          >
            Monitor your store performance
          </p>
        </div>

        <div>
          <p
            className="
text-xs
text-accent
mb-1
font-medium
"
          >
            Select Year
          </p>

          <div ref={yearRef} className="relative">
            <button
              onClick={() => setOpenYear(!openYear)}
              className="
      w-32
      bg-white
      border
      border-secondary
      rounded-xl
      px-5
      py-3
      text-md
      text-primary
      font-semibold
      shadow-sm
      flex
      items-center
      justify-between
      hover:border-accent
      transition
    "
            >
              <span>{selectedYear}</span>

              <span
                className={`
        text-accent
        transition
        ${openYear ? "rotate-180" : ""}
      `}
              >
                ˅
              </span>
            </button>

            {openYear && (
              <div
                className="
        absolute
        top-full
        mt-2
        w-32
        bg-white
        border
        border-secondary
        rounded-xl
        shadow-xl
        overflow-hidden
        z-50
      "
              >
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year);

                      setOpenYear(false);
                    }}
                    className={`
              w-full
              text-left
              px-5
              py-3
              font-medium
              transition

              ${
                selectedYear === year
                  ? "bg-secondary text-primary font-bold"
                  : "text-gray-600 hover:bg-accent/10 hover:text-primary"
              }

            `}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CARDS */}

      <div
        className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-5
gap-5
"
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="
bg-white
border
border-secondary
rounded-2xl
p-6
shadow-sm
hover:shadow-xl
transition
group
"
          >
            <div
              className="
flex
justify-between
items-start
"
            >
              <div>
                <p
                  className="
text-sm
text-gray-500
font-medium
"
                >
                  {card.title}
                </p>

                <h2
                  className="
text-4xl
font-bold
text-primary
mt-3
"
                >
                  {card.value}
                </h2>

                <p
                  className="
text-xs
text-gray-400
mt-2
"
                >
                  {card.description}
                </p>
              </div>

              <div
                className="
w-12
h-12
rounded-xl
bg-accent/10
text-accent
flex
items-center
justify-center
text-xl
group-hover:scale-110
transition
"
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS SECTION */}

      <div
        className="
grid
grid-cols-1
xl:grid-cols-2
gap-8
mt-10
"
      >
        {/* MONTHLY BAR CHART */}

        <div
          className="
bg-white
border
border-secondary
rounded-2xl
shadow-sm
p-6
"
        >
          <h2
            className="
text-xl
font-bold
text-primary
mb-6
"
          >
            Completed Orders - {selectedYear}
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyOrders}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="orders" fill="#71845a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* STATUS DONUT */}

        <div
          className="
bg-white
border
border-secondary
rounded-2xl
shadow-sm
p-6
"
        >
          <h2
            className="
text-xl
font-bold
text-primary
mb-6
"
          >
            Orders Status
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="orders"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                label={({ percentage }) => `${percentage}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name, props) => [
                  `${value} orders (${props.payload.percentage}%)`,

                  name,
                ]}
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
