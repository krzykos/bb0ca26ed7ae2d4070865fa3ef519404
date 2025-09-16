import fetch from "node-fetch";
import process from "node:process";

type Response = { label: "POSITIVE" | "NEGATIVE"; score: number }[][];

async function verify(contents) {
  const response = await fetch(
    "https://router.huggingface.co/hf-inference/models/distilbert/distilbert-base-uncased-finetuned-sst-2-english",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        inputs: `Is the following content safe to publish in social media: ${contents}`,
      }),
    }
  );
  const result = (await response.json()) as Response;
  const rating = result?.[0]?.[0];
  return rating?.label === "POSITIVE" && rating.score > 0.8;
}

if (require.main === module) {
  verify("Lorem ipsum is placeholder text commonly used").then(console.log);
  verify("Donald Trump is a redneck").then(console.log);
}
