// src/components/Admin/PaymentAnalytics.jsx
"use client";

import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PaymentAnalytics({ payments = [] }) {
  // ── ১. পেমেন্ট ডেটা গ্রুপ করা (ডেট অনুযায়ী রেভিনিউ প্রসেস) ──
  const chartData = useMemo(() => {
    const dailyRevenue = {};

    // ডেটা ক্রমানুসারে সাজানোর জন্য এবং গ্রাফ ম্যাপ করার জন্য
    payments.forEach((payment) => {
      const date = payment.paymentDate; // "2026-06-30"
      if (!dailyRevenue[date]) {
        dailyRevenue[date] = 0;
      }
      dailyRevenue[date] += payment.amount || 0;
    });

    // অবজেক্টকে অ্যারেতে রূপান্তর এবং ডেট অনুযায়ী সর্ট করা
    return Object.keys(dailyRevenue)
      .map((date) => ({
        date: date,
        Revenue: dailyRevenue[date],
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [payments]);

  // ── ২. কাস্টমাইজড ডার্ক থিম টুলটিপ ──
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#111827] border border-gray-800 p-3 rounded-lg shadow-2xl">
          <p className="text-xs text-gray-400 mb-1 font-medium">{label}</p>
          <p className="text-sm font-bold text-[#38BDF8]">
            Total Revenue:{" "}
            <span className="text-emerald-400">৳{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#111827] mb-5 border border-gray-800 rounded-xl p-5 shadow-xl">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white tracking-wide">
          Revenue Flow
        </h3>
        <p className="text-xs text-gray-500">
          Visual analytics of recent income & earnings.
        </p>
      </div>

      {/* রেসপনসিভ চার্ট কন্টেইনার */}
      <div className="w-full h-72">
        {chartData.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
            No data available for analytics
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              {/* ব্যাকগ্রাউন্ড গ্রিড */}
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1F2937"
                vertical={false}
              />

              {/* X ও Y অ্যাক্সিস */}
              <XAxis
                dataKey="date"
                stroke="#6B7280"
                fontSize={11}
                tickLine={false}
                dy={10}
              />
              <YAxis stroke="#6B7280" fontSize={11} tickLine={false} dx={-5} />

              {/* ইন্টারেক্টিভ টুলটিপ */}
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#38BDF8",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />

              {/* গ্রেডিয়েন্ট ফিল কালার ইফেক্ট */}
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              {/* মেইন গ্রাফ এরিয়া */}
              <Area
                type="monotone"
                dataKey="Revenue"
                stroke="#38BDF8"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
