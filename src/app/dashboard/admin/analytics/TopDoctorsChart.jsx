// src/components/Admin/TopDoctorsChart.jsx
"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// প্রজেক্টের সায়ান ব্লু থিম অনুযায়ী ৫টি প্রফেশনাল শেড (টপ ৫ ডক্টরের জন্য)
const colors = ["#38BDF8", "#0EA5E9", "#0284C7", "#0369A1", "#075985"];

// কাস্টম ডার্ক মোড টুলটিপ
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length > 0 && payload.payload) {
    const data = payload.payload;
    return (
      <div className="bg-[#111827] border border-gray-800 p-3 rounded-lg shadow-2xl">
        <p className="text-sm font-bold text-white">
          {data?.doctorName || "Unknown Doctor"}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Average Rating:{" "}
          <span className="text-[#38BDF8] font-bold">
            ⭐ {data?.averageRating || 0} / 5
          </span>
        </p>
        <p className="text-[11px] text-gray-500 mt-0.5">
          Total Reviews: {data?.totalReviews || 0}
        </p>
      </div>
    );
  }
  return null;
};

export default function TopDoctorsChart({ doctorsData = [] }) {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-xl w-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white tracking-wide">
          Top Rated Doctors
        </h3>
        <p className="text-xs text-gray-500">
          Performance metrics based on real-time patient star ratings.
        </p>
      </div>

      {/* রেসপনসিভ প্যারেন্ট কন্টেইনার ফিক্সড হাইটসহ */}
      <div className="w-full h-[350px]">
        {doctorsData.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm italic">
            No review data available yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={doctorsData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 5,
              }}
              barSize={45} // বারের থিকনেস বা চওড়া কন্ট্রোল করার জন্য
            >
              {/* ডার্ক ব্যাকগ্রাউন্ড গ্রিড */}
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1F2937"
                vertical={false}
              />

              {/* X Axis - ডক্টরের নাম */}
              <XAxis
                dataKey="doctorName"
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                dy={10}
              />

              {/* Y Axis - রেটিং স্কেল ০ থেকে ৫ */}
              <YAxis
                stroke="#6B7280"
                fontSize={12}
                domain
                tickLine={false}
                dx={-5}
              />

              {/* টুলটিপ */}
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "#1F2937", opacity: 0.2 }}
              />

              {/* সাধারণ রেগুলার বার */}
              <Bar
                dataKey="averageRating"
                radius // বারের উপরের কোণাগুলো হালকা রাউন্ড করার জন্য
              >
                {/* প্রতিটা বারে আলাদা আলাদা সায়ান শেড অ্যাপ্লাই করার জন্য লুপ */}
                {doctorsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
