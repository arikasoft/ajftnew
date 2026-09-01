import ApplicationCounter from "@/models/ApplicationCounter";

export async function generateDivyangApplicationId() {
  const year = new Date().getFullYear();

  const counter =
    await ApplicationCounter.findOneAndUpdate(
      {
        name: `DIVYANG-${year}`,
      },

      {
        $setOnInsert: {
          year,
        },

        $inc: {
          sequence: 1,
        },
      },

      {
        new: true,
        upsert: true,
        returnDocument: "after",
      }
    );

  const sequence =
    String(counter.sequence).padStart(
      6,
      "0"
    );

  return `AJFT-DIV-${year}-${sequence}`;
}