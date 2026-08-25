import { Schema, model, models } from "mongoose";
import InternshipApplication from "@/models/InternshipApplication";

const CounterSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },

    value: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: "application_counters",
  }
);

const Counter =
  models.ApplicationCounter ||
  model(
    "ApplicationCounter",
    CounterSchema
  );

/**
 * Generates a NEW sequential application number.
 *
 * Existing records are respected, so if the database already
 * contains AJFT-INT-2026-00001, the next number will be 00002.
 *
 * The actual increment is atomic, so simultaneous submissions
 * cannot normally receive the same counter value.
 */
export async function generateApplicationId() {
  const year =
    new Date().getFullYear();

  const key =
    `internship-${year}`;

  /* -----------------------------------------------
     Initialize counter from existing applications
     when this is the first use of this counter.
  ------------------------------------------------ */

  let counter =
    await Counter.findOne({
      key,
    });

  if (!counter) {
    const latest =
      await InternshipApplication.findOne({
        applicationId: {
          $regex: `^AJFT-INT-${year}-\\d{5}$`,
        },
      })
        .sort({
          createdAt: -1,
        })
        .select("applicationId")
        .lean();

    let lastNumber = 0;

    if (latest?.applicationId) {
      const match =
        latest.applicationId.match(
          /-(\d{5})$/
        );

      if (match) {
        lastNumber =
          Number(match[1]) || 0;
      }
    }

    try {
      counter =
        await Counter.create({
          key,
          value: lastNumber,
        });
    } catch {
      // Another request initialized it first.
      counter =
        await Counter.findOne({
          key,
        });
    }
  }

  if (!counter) {
    throw new Error(
      "Unable to initialize application number counter."
    );
  }

  /* -----------------------------------------------
     Atomic increment
  ------------------------------------------------ */

  const updated =
    await Counter.findOneAndUpdate(
      { key },
      {
        $inc: {
          value: 1,
        },
      },
      {
        new: true,
      }
    );

  if (!updated) {
    throw new Error(
      "Unable to generate application number."
    );
  }

  return `AJFT-INT-${year}-${String(
    updated.value
  ).padStart(5, "0")}`;
}