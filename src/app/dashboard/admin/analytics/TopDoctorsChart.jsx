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
  LabelList,
  ResponsiveContainer,
} from "recharts";

// প্রজেক্ট থিমের সাথে ম্যাচ করে সায়ান ও ডার্ক ব্লু এর ৫টি শেডের কালার প্যালেট (টপ ৫ ডক্টরের জন্য)
const colors = ["#38BDF8", "#0EA5E9", "#0284C7", "#0369A1", "#075985"];

// কাস্টম ট্রায়াঙ্গেল বার তৈরির পাথ জেনারেটর (বিশুদ্ধ JS)
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

// কাস্টম ট্রায়াঙ্গেল বার শেপ কম্পোনেন্ট
const TriangleBar = (props) => {
  const { x, y, width, height, index, isActive } = props;
  const color = colors[index % colors.length];

  return (
    <path
      strokeWidth={isActive ? 3 : 0}
      d={getPath(Number(x), Number(y), Number(width), Number(height))}
      stroke="#38BDF8"
      fill={color}
      style={{
        transition: "all 0.3s ease-out",
        fillOpacity: isActive ? 1 : 0.85,
      }}
    />
  );
};

// বারের উপরে রেটিং দেখানোর জন্য কাস্টম লেবেল
const CustomColorLabel = (props) => {
  const { x, y, width, value, index } = props;
  const fill = colors[index % colors.length];

  return (
    <text
      x={x + width / 2}
      y={y - 8}
      fill={fill}
      textAnchor="middle"
      className="text-xs font-bold"
    >
      ⭐ {value}
    </text>
  );
};

// কাস্টম ডার্ক মোড টুলটিপ
// ─── কাস্টম ডার্ক মোড টুলটিপ (এরর ফ্রি আপডেটেড ভার্সন) ───
const CustomTooltip = ({ active, payload }) => {
  // ১. সেফটি চেক: active ট্রু এবং payload এর ভেতর ডেটা আছে কিনা নিশ্চিত করা
  if (active && payload && payload.length > 0 && payload.payload) {
    const data = payload.payload;

    return (
      <div className="bg-[#111827] border border-gray-800 p-3 rounded-lg shadow-2xl">
        {/* অপশনাল চেইনিং ?. ব্যবহার করা হয়েছে সেফটির জন্য */}
        <p className="text-sm font-bold text-white">
          {data?.doctorName || "Unknown Doctor"}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Average Rating:{" "}
          <span className="text-[#38BDF8] font-bold">
            {data?.averageRating || 0} / 5
          </span>
        </p>
        <p className="text-[11px] text-gray-500 mt-0.5">
          Total Reviews: {data?.totalReviews || 0}
        </p>
      </div>
    );
  }

  // হোভার না থাকলে কিছুই দেখাবে না, কোনো এররও আসবে না
  return null;
};

export default function TopDoctorsChart({ doctorsData = [] }) {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-xl w-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white tracking-wide">
          Top 5 Rated Doctors
        </h3>
        <p className="text-xs text-gray-500">
          Based on real-time patient reviews and average star ratings.
        </p>
      </div>

      {/* রেসপনসিভ কন্টেইনার যাতে চার্ট সব স্ক্রিনে সুন্দর দেখায় */}
      <div className="w-full h-[350px] flex justify-center items-center">
        {doctorsData.length === 0 ? (
          <p className="text-gray-500 text-sm italic">
            No review data available yet.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={doctorsData}
              margin={{
                top: 25,
                right: 10,
                left: -25,
                bottom: 10,
              }}
            >
              {/* ডার্ক থিম গ্রিড লাইন্স */}
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

              {/* Y Axis - রেটিং স্কেল (সর্বোচ্চ ৫ স্টার) */}
              <YAxis
                stroke="#6B7280"
                fontSize={12}
                domain={``}
                tickLine={false}
                dx={-5}
              />

              {/* ইন্টারেক্টিভ কাস্টম টুলটিপ */}
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "#1F2937", opacity: 0.3 }}
              />

              {/* মেইন বার */}
              <Bar dataKey="averageRating" shape={<TriangleBar />} activeBar>
                <LabelList
                  dataKey="averageRating"
                  content={<CustomColorLabel />}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
