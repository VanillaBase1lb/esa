import { validateSms } from "./validate.js";
import { addCache, getCache } from "./redis.js";
import express from "express";
import { createClient } from "redis";

export const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

const app = express();

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.get("/inbound/sms", (req, res) => {
  const err = validateSms(req.query);
  const msg = err ? "" : "inbound sms is ok";
  if (!err && req.query.text.toUpperCase() == "STOP") {
    try {
      addCache(req.query.from, req.query.to);
    } catch {
      res.json({ message: "", error: "unknown failure" });
    }
  }
  res.json({ message: msg, error: err });
});

app.get("/outbound/sms", async (req, res) => {
  const err = validateSms(req.query);
  const msg = err ? "" : "outbound sms is ok";
  if (!err) {
    try {
      const cached = await getCache(req.query.from);
      if (parseInt(cached.requests) > 50) {
        res.json({
          message: "",
          error: `limit reached for from ${req.query.from}`,
        });
        return;
      } else if (cached.to == req.query.to) {
        res.json({
          message: "",
          error: `sms from ${req.query.from} to ${req.query.to} blocked by STOP request`,
        });
        return;
      }
    } catch (e) {
      console.log(e);
      res.json({ message: "", error: "unknown failure" });
      return;
    }
  }
  res.json({ message: msg, error: err });
});

// for anything other than GET
app.all("*", (_, res) => {
  res.status(405).send("Method not allowed");
});

app.listen(8989, () => {
  console.log("Server running on port 8989");
});

// await client.disconnect();
