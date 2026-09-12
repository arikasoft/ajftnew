"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type FormData = {
  donorName: string;
  mobile: string;
  email: string;
  address: string;
  pan: string;
  amount: string;
  requires80G: boolean;
  paymentId: string;
  orderId: string;
  receiptNo: string;
};

export default function ManualDonationPage() {
  const [form, setForm] = useState<FormData>({
    donorName: "",
    mobile: "",
    email: "",
    address: "",
    pan: "",
    amount: "",
    requires80G: false,
    paymentId: "",
    orderId: "",
    receiptNo: "",
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [successData, setSuccessData] =
    useState<{
      receiptNo: string;
      verifyUrl: string;
      receiptUrl: string;
    } | null>(null);

  function updateField(
    field: keyof FormData,
    value: string | boolean
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccessData(null);

    try {
      const response = await fetch(
        "/api/admin/donations/manual",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            amount: Number(form.amount),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to add donation."
        );
      }

      setMessage(
        "Manual donation added successfully."
      );

      setSuccessData({
        receiptNo: data.donation.receiptNo,
        verifyUrl: data.verifyUrl,
        receiptUrl: data.receiptUrl,
      });

      setForm({
        donorName: "",
        mobile: "",
        email: "",
        address: "",
        pan: "",
        amount: "",
        requires80G: false,
        paymentId: "",
        orderId: "",
        receiptNo: "",
      });
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Add Manual Donation
            </h1>

            <p className="mt-1 text-sm text-gray-600">
              Add offline, cash, bank transfer or UPI donations.
            </p>
          </div>

          <Link
            href="/admin/donations"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700"
          >
            View Donations
          </Link>
        </div>

        {message && (
          <div
            className={`mb-6 rounded-xl border p-4 ${
              successData
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {successData && (
          <div className="mb-6 rounded-xl border border-green-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">
              Donation Added Successfully
            </h2>

            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Receipt Number
              </p>

              <p className="text-xl font-bold text-green-700">
                {successData.receiptNo}
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={successData.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white"
              >
                Verify Receipt
              </a>

              <a
                href={successData.receiptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-green-600 px-4 py-2 text-center font-medium text-white"
              >
                Open Receipt
              </a>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-white p-5 shadow-sm md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-1 block text-sm font-medium">
                Donor Name *
              </label>

              <input
                required
                value={form.donorName}
                onChange={(event) =>
                  updateField(
                    "donorName",
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                placeholder="Enter donor name"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Mobile Number *
              </label>

              <input
                required
                value={form.mobile}
                onChange={(event) =>
                  updateField(
                    "mobile",
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                placeholder="Enter mobile number"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Email Address *
              </label>

              <input
                required
                type="email"
                value={form.email}
                onChange={(event) =>
                  updateField(
                    "email",
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Donation Amount (₹) *
              </label>

              <input
                required
                type="number"
                min="1"
                value={form.amount}
                onChange={(event) =>
                  updateField(
                    "amount",
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                placeholder="Enter amount"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                PAN Number
              </label>

              <input
                value={form.pan}
                onChange={(event) =>
                  updateField(
                    "pan",
                    event.target.value.toUpperCase()
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                placeholder="ABCDE1234F"
                maxLength={10}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Transaction / UTR Number
              </label>

              <input
                value={form.paymentId}
                onChange={(event) =>
                  updateField(
                    "paymentId",
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                placeholder="UTR / Transaction ID"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Order / Reference ID
              </label>

              <input
                value={form.orderId}
                onChange={(event) =>
                  updateField(
                    "orderId",
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Receipt Number
              </label>

              <input
                value={form.receiptNo}
                onChange={(event) =>
                  updateField(
                    "receiptNo",
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                placeholder="Leave empty for auto generation"
              />

              <p className="mt-1 text-xs text-gray-500">
                Leave empty to automatically generate
                a receipt number.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-1 block text-sm font-medium">
              Address
            </label>

            <textarea
              rows={3}
              value={form.address}
              onChange={(event) =>
                updateField(
                  "address",
                  event.target.value
                )
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              placeholder="Donor address"
            />
          </div>

          <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">
            <input
              type="checkbox"
              checked={form.requires80G}
              onChange={(event) =>
                updateField(
                  "requires80G",
                  event.target.checked
                )
              }
              className="h-5 w-5"
            />

            <span>
              <span className="block font-medium">
                80G Donation
              </span>

              <span className="text-sm text-gray-500">
                Mark this donation as eligible for
                80G.
              </span>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Saving Donation..."
              : "Add Manual Donation"}
          </button>
        </form>
      </div>
    </main>
  );
}